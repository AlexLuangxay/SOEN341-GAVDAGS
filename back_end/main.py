from flask import Flask, render_template, request, session, redirect, url_for 
from flask_socketio import join_room, leave_room, send, emit, SocketIO
from flask_cors import CORS
from datetime import datetime
from string import ascii_uppercase
import random 
import os
import oracledb
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DSN = os.getenv("DB_DSN")
WALLET_PATH = os.getenv("WALLET_PATH")

oracledb.init_oracle_client(config_dir=WALLET_PATH)

app = Flask(__name__)

# Create a DB connection instance (to be used in routes)
def get_db_connection():
    connection = oracledb.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        dsn=DB_DSN
    )
    return connection

app.config["SECRET_KEY"] = "GAVDAGS"
CORS(app)
socketIO = SocketIO(app, cors_allowed_origins="*")
   
users = {}
rooms = {}

@socketIO.on("username")
def receive_username(username):
    session["name"] = username
    #users[username] = request.sid
    #print(f"User added: {username} with SID: {request.sid}")
    #print(f"Current users dict: {users}")

@socketIO.on("createSignal")
def generate_unique_code():
    while True: 
        code = ""
        for _ in range(4):
            code += random.choice(ascii_uppercase)
        if code not in rooms: 
            break 
    print(f"Generated Room Code: {code}")
    room = code 
    #rooms.update(room)
    rooms[room] = {"members": 0, "messages": []}
    session["room"] = room 
    session["ID"] = request.sid
    
    # Make the creator **JOIN** the room
    join_room(room)
    rooms[room]["members"] += 1  

    # Emit the generated room code to all connected clients
    socketIO.emit("newRoomCode", {"code": room})

    print(f"Generated ID: {request.sid} joined room {room}")

@socketIO.on("groupCode")
def join_group(data):
    room = data["code"]
    username = data["username"]
    join_room(room)
    rooms[room]["members"] += 1
    session["room"] = room
    session["name"] = username
    send(f"{username} has joined the room.", to=room)
    print(f"{username} joined room {room}")

@socketIO.on("sendMessage")
def send_message(data):
    room = data.get("room")
    message = data.get("message")
    username = session.get("name")

    # if room not in rooms:
    #     print(f"Room {room} not found")
    #     return 

    timestamp = datetime.now().strftime('%Y-%m-%d %I:%M %p')
    rooms[room]["messages"].append({"user" : username, "message" : message, "timestamp" : timestamp})
    print(f"Message sent in {room} from {username}: {message}")   
    socketIO.emit("messageReceived", {"user": username, "message": message, "timestamp": timestamp}, room=room)
    
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
    print(f"{name} has left room {room}")

if __name__ == "__main__":
    socketIO.run(app,debug=True)
