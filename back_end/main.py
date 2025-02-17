from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import join_room, leave_room, send, emit, SocketIO
from flask_cors import CORS
import random
from string import ascii_uppercase
#from routes.api import api_bp
import os
#import oracledb
from dotenv import load_dotenv

load_dotenv()

#DB_USER = os.getenv("DB_USER")
#DB_PASSWORD = os.getenv("DB_PASSWORD")
#DB_DSN = os.getenv("DB_DSN")
#WALLET_PATH = os.getenv("WALLET_PATH")

#oracledb.init_oracle_client(config_dir=WALLET_PATH)

app = Flask(__name__)
app.config["SECRET_KEY"] = "GAVDAGS"
CORS(app)
socketIO = SocketIO(app, cors_allowed_origins="*")

users = {}

@socketIO.on("connect") 
def connect():
    print(f"User connected {request.sid}")

@socketIO.on("message")
def handle_message(data):
    sender_session_id = request.sid
    recipient_session_id = users.get(data['username'])
    if recipient_session_id:
        message = data['message']
        print(f"Message from {sender_session_id} to {data['username']}: {message}")
        # Send message to recipient
        emit("message", message, room=recipient_session_id)
        # Send message to sender
        emit("message", message, room=sender_session_id)
    else:
        print(f"Recipient {data['username']} not found")

@socketIO.on("username")
def receive_username(username):
    users[username] = request.sid
    print(f"User added: {username} with SID: {request.sid}")
    print(f"Current users dict: {users}")

@socketIO.on("disconnect")
def disconnect():
    print(f"User disconnected {request.sid}")

if __name__ == "__main__":
    socketIO.run(app,debug=True)
    
""" rooms = {}

def generate_unique_code(length):
    while True: 
        code = ""
        for _ in range(length):
            code += random.choice(ascii_uppercase)
        if code not in rooms: 
            break 
    return code 

@app.route("/", methods=["POST", "GET"])
def home():
    session.clear()
    if request.method == "POST":
        name = request.form.get("name")
        code = request.form.get("code")
        join = request.form.get("join", False)
        create = request.form.get("create", False)

        if not name: 
            return render_template("home.html", error = "Please enter a name.", code=code, name=name)
        if join != False and not code: 
            return render_template("home.html", error = "Please enter a room code.", code=code, name=name)
        
        room = code
        if create != False: 
            room = generate_unique_code(4)
            rooms[room] = {"members": 0, "messages": []}
        elif code not in rooms: 
            return render_template("home.html", error = "Room does not exist.", code=code, name=name)
        
        session["room"] = room 
        session["name"] = name
        return redirect(url_for("room"))

    return render_template("home.html")    

@app.route("/room")
def room():
    room = session.get("room")
    if room is None or session.get("name") is None or room not in rooms:
        return redirect(url_for("home"))
    
    return render_template("room.html", code=room, messages=rooms[room]["messages"])

@socketIO.on("message")
def message(data):
    room = session.get("room")
    if room not in rooms: 
        return 
    content = {
        "name": session.get("name"),
        "message": data["data"]
    }

    send(content, to=room)
    rooms[room]["messages"].append(content)
    print(f"{session.get('name')} said: {data['data']}")

@socketIO.on("connect")
def connect(auth):
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

@socketIO.on("disconnect")
def disconnect():
    room = session.get("room")
    name = session.get("name")
    leave_room(room)

    if room in rooms:
        rooms[room]["members"] -= 1
        if rooms[room]["members"] <= 0:
            del rooms[room]

    send({"name": name, "message": "has left the room"}, to=room)
    print(f"{name} has left room {room}") """

