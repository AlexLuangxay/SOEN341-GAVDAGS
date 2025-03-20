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

@app.route('/users', methods=['GET'])
@login_required
def fetch_users():
    users = get_all_users() 
    users = [user for user in users if user["name"] != session.get('user')]
    return jsonify(users), 200 

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
        return jsonify({"message": "Account created successfully"}), 201
    
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if check_client_credentials(username, password):
        session.permanent = True
        session['user'] = username
        return jsonify({"message": "Login successful", "redirect": "/groupmessage"}), 200

    return jsonify({"message": "Invalid credentials"}), 401

@socketIO.on("createSignal")
def generate_new_guild(data):
    username = data["username"]
    group_name = ""
    for _ in range(4):
        group_name += random.choice(ascii_uppercase)
    addGuildMember(create_guild(group_name),get_client_id(username),1)
    print(f"Generated Group Code: {group_name}")
    socketIO.emit("updateGroups", {"group_name": group_name})

@socketIO.on("joinSignal")
def join_group(data):
    group_name = data["group_name"]
    username = data["username"]

    if not check_guild(group_name):
        print(f"Group {group_name} not found")
        return 
    
    join_room(group_name)
    addGuildMember(group_name,get_client_id(username),0)

# @socketIO.on("sendMessage")
# def send_message(data):
#     room = data.get("room")
#     message = data.get("message")
#     username = session.get("name")
#     timestamp = datetime.now().strftime('%Y-%m-%d %I:%M %p')
#     rooms[room]["messages"].append({"user": username, "message": message, "timestamp": timestamp, "room": room})
#     print(f"Message sent in {room} from {username}: {message}")
#     socketIO.emit("messageReceived", {"user": username, "message": message, "timestamp": timestamp, "room": room}, room=room)

# @socketIO.on("connect")
# def connect(auth):
#     room = session.get("room")
#     name = session.get("name")
#     if not room or not name: 
#         return 
#     if room not in rooms: 
#         leave_room(room)
#         return 

#     join_room(room)
#     send({"name": name, "message": "has entered the room"}, to=room)
#     rooms[room]["members"] += 1
#     socketIO.emit("updateUsers", rooms[room]["users"], room=room) # Emit updated user list
#     print(f"{name} joined room {room}")

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
#     socketIO.emit("updateUsers", rooms[room]["users"], room=room) # Emit updated user list
#     print(f"{name} has left room {room}")

@app.route('/logout')
@login_required
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully"}), 200

if __name__ == "__main__":
    socketIO.run(app,debug=True)