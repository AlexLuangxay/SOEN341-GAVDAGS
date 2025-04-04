from flask import Flask, request, jsonify, session, url_for, redirect
from flask_socketio import join_room, leave_room, send, SocketIO
from flask_cors import CORS
from datetime import datetime
from string import ascii_uppercase
import random 
import os
from api import *
from datetime import timedelta
from functools import wraps

app = Flask(__name__)

app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
app.config['SESSION_TYPE'] = 'filesystem'

app.config["SECRET_KEY"] = "GAVDAGS"
CORS(app, supports_credentials=True)
socketIO = SocketIO(app, cors_allowed_origins="*")

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/get_user_groups', methods=['GET'])
@login_required
def get_user_groups():
    username = session.get('user')
    client_id = get_client_id(username)  # Fetch user ID
    groups = getGuildFromMember(client_id)  # Fetch groups from database

    if not groups:
        return jsonify([])  # Return empty list if no groups found

    group_ids = [group[0] for group in groups]  # Extract group names
    group_names = [get_guild_name(group_id) for group_id in group_ids] 
    #print(group_names)
    return jsonify(group_names), 200

@app.route('/get_group_users', methods=['POST'])
@login_required
def get_group_users():
    data = request.get_json()
    group_name = data.get('group')

    if not group_name:
        return jsonify({"error": "Group name is required"}), 400

    guild_id = get_guild_id(group_name)
    users = getUserFromGuild(guild_id)

    if not users:
        return jsonify([])  # Return empty list if no users found

    user_list = []  
    for user in users:
        username = user[0] # Extract usernames
        client_id = get_client_id(username)
        status = fetch_user_status(client_id)
        user_list.append({
            'username': username,
            'status': status
        })
    return jsonify(user_list), 200

@app.route('/fetch_channels', methods=['POST'])
@login_required
def fetch_channels():
    data = request.get_json()
    current_group = data.get('group')
    channel_name = data.get('channel')
    if not current_group or not channel_name:
        print(current_group, channel_name)
        return jsonify({"error": "Group and channel name are required"}), 400

    print(f"Received channel '{channel_name}' for group '{current_group}'")
    guild_id = get_guild_id(current_group)
    create_channel(guild_id, channel_name)

    return jsonify({"message": "Channel received successfully"}), 200

@app.route('/getchannelmessages', methods=['POST'])
@login_required
def fetch_channelmessages():
    data = request.get_json()
    channelid = getIDFromChannel(data.get('channel'))
    print(channelid[0])
    message_data = getLetterFromChannel(channelid[0])
    print(message_data)

    letter_data = []

    for item in message_data:
        letter_data.append({
            'message': getMessageFromLetter(item[1]), 
            'user': get_client_name(getSenderFromLetter(item[1])), 
            'timestamp': getTimeStampFromLetter(item[1]).isoformat(timespec='minutes').replace('T', ' ')})

    if not letter_data:
        return jsonify([]) 
    
    return jsonify(letter_data)


@app.route('/users', methods=['GET'])
@login_required
def fetch_users():
    users = get_all_users() 
    users = [user for user in users if user["name"] != session.get('user')]
    return jsonify(users), 200 

@app.route('/channels', methods=['POST'])
@login_required
def channels():
    data = request.get_json()
    guild_id = get_guild_id(data.get('group'))
    channel_ids = getChannelFromGuild(guild_id)

    if isinstance(channel_ids, list):
        channel_ids = [channel_id[1] for channel_id in channel_ids]

    channels = [getChannelFromID(channel_id) for channel_id in channel_ids]
    
    flat_channels = []
    for channel in channels:
        if isinstance(channel, list) and len(channel) > 0:
            flat_channels.append(channel[0][0])
    print("chat ", guild_id, "has channels: ", flat_channels)
    return jsonify(flat_channels), 200

@app.route('/current_user', methods=['GET'])
@login_required
def send_current_user():
    return jsonify(session.get('user')), 200

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if read_client_username(username):
        return jsonify({"error": "Username already exists"}), 400
    else:
        create_client(username, password)
        update_user_status(get_client_id(username), 1)  # Set user status to online
        socketIO.emit("statusUpdate", {"username": username, "status": "Online"})  # Emit status update to all clients
        return jsonify({"message": "Account created successfully"}), 201
    
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if check_client_credentials(username, password):
        session.permanent = True
        session['user'] = username
        update_user_status(get_client_id(username), 1)  # Set user status to online
        socketIO.emit("statusUpdate", {"username": username, "status": "Online"})  # Emit status update to all clients
        return jsonify({"message": "Login successful", "redirect": "/groupmessage"}), 200

    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/check_admin', methods=['POST'])
@login_required 
def check_admin():
    try:
        data = request.get_json()
        group_name = data.get('group')

        if not group_name:
            return jsonify({"error": "Group name is required"}), 400

        guild_id = get_guild_id(group_name)
        client_id = get_client_id(session.get('user'))

        return jsonify({"is_admin": check_admin_status(guild_id, client_id)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error message
        
# users = {}
rooms = {}

@socketIO.on("createSignal")
def generate_new_guild(data):
    username = data["username"]
    group_name = ""
    for _ in range(4):
        group_name += random.choice(ascii_uppercase)
    addGuildMember(create_guild(group_name),get_client_id(username),1)
    join_room(group_name)
    print(f"Generated Group Code: {group_name}")
    session["room"] = group_name # Store the room in the session
    session["user"] = username
    socketIO.emit("newRoomCode", {"group_name": group_name})

@socketIO.on("joinSignal")
def join_group(data):
    group_name = data["code"]
    username = data["username"]

    if not check_guild(get_guild_id(group_name)):
        print(f"Group {(group_name)} not found")
        return 
    
    join_room(group_name) # Some socket thing, have to look into whether we really need this or not 
    addGuildMember(get_guild_id(group_name),get_client_id(username),0)
    session["room"] = group_name # Store the room in the session
    session["user"] = username
    socketIO.emit("newRoomCode", {"group_name": group_name})

@socketIO.on("sendPrivateMessage")
def send_private_message(data):
    message = data.get("message")
    recipient = data.get("recipient")
    timestamp = datetime.now().strftime('%Y-%m-%d %I:%M %p')
    sender = data.get("currentUser")
    print(f"Private message sent from {sender} to {recipient}: {message}")
    create_whisper(get_client_id(sender), get_client_id(recipient))
    create_private_letter(get_client_id(sender), get_client_id(recipient), message)
    socketIO.emit("privateMessageReceived", {"user": sender, "recipient": recipient, "message": message, "timestamp": timestamp})

@socketIO.on("sendMessage")
def send_message(data):
    room = data.get("room")
    channel = data.get("channel")
    message = data.get("message")
    username = data.get("currentUser")
    timestamp = datetime.now().strftime('%Y-%m-%d %I:%M %p')
    socketIO.emit("messageReceived", {"user": username, "message": message, "timestamp": timestamp, "room": room}, room=room)
    print(f"Message sent in {room} from {username}: {message}")
    #create_public_letter(get_client_id(username), message) FIX THIS WHEN YOU GET METHOD TO RETRIEVE CHANNEL 
    #rooms[room]["messages"].append({"user": username, "message": message, "timestamp": timestamp, "room": room})
    print(f"Message sent in {room}, {channel} from {username}: {message}")
    channelid = getIDFromChannel(channel)
    userid = get_client_id(username)
    create_public_letter(channelid, userid, message)
    socketIO.emit("messageReceived", {"user": username, "message": message, "timestamp": timestamp, "room": room, "channel": channel}, room=room)
    

@socketIO.on("connect")
def connect():
    room = session.get("room")
    name = session.get("name")
    if not room or not name: 
        return 
    if room not in rooms: 
        leave_room(room)
        return 

    join_room(room)
    send({"name": name, "message": "has entered the room"}, to=room)
    rooms[room]["members"] += 1
    print(f"{name} joined room {room}")
    
# @socketIO.on("disconnect")
# def disconnect():
#     room = session.get("room")
#     name = session.get("name")
#     leave_room(room)
#     if room in rooms:
#         rooms[room]["members"] -= 1
#         rooms[room]["users"] = [user for user in rooms[room]["users"] if user["name"] != name] # Remove user from room
#         if rooms[room]["members"] <= 0:
#             del rooms[room]

#     send({"name": name, "message": "has left the room"}, to=room)
#     print(f"{name} has left room {room}")

@app.route('/getMessages', methods=['GET'])
@login_required
def get_messages():
    user1 = get_client_id(session.get('user'))
    user2 = get_client_id(request.args.get('user'))
    whisper_data = get_whisperhasletter(user1, user2)

    if not whisper_data:
        return jsonify([])  # Return empty array if no data

    messages = []
    for data in whisper_data:
        letter_id = data[2]
        letter = read_private_letter(letter_id)
        if letter:
            messages.append({
                'id': letter[0],
                'user': get_client_name(letter[1]),
                'receiver': letter[2],
                'message': letter[3],
                'timestamp': letter[4].isoformat(timespec='minutes').replace('T', ' ')  # Convert to JSON-friendly format
            })

    return jsonify(messages)

@app.route('/get_user_status', methods=['GET'])
def get_user_status():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "Username is required"}), 400
 
    client_id = get_client_id(username)
    if client_id is None:
        return jsonify({"error": "User not found"}), 404
 
    status = fetch_user_status(client_id)  # Fetch status from the database
    #print(f"User {username} is {'online' if status else 'offline'}")
    return jsonify({"status": status}), 200

@app.route('/getChannelMessages', methods=['GET'])
@login_required
def get_channel_messages():
    channel_id = request.args.get('channel_id')

    if not channel_id:
        return jsonify({"error": "Channel ID is required"}), 400

    messages_data = getLetterFromChannel(channel_id)

    if not messages_data:
        return jsonify([])  # Return empty array if no messages

    messages = []
    for message in messages_data:
        messages.append({
            'id': message[0],
            'user': get_client_name(message[1]),  # Sender name
            'channel_id': channel_id,
            'message': message[2],
            'timestamp': message[3].isoformat(timespec='minutes').replace('T', ' ')  # Convert timestamp format
        })

    return jsonify(messages)

@app.route('/logout')
@login_required
def logout():
    username = session.get('user')
    update_user_status(get_client_id(username), 0)
    socketIO.emit("statusUpdate", {"username": username, "status": "Offline"})
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully"}), 200

if __name__ == "__main__":
    socketIO.run(app,debug=True, port=5001)