from flask import Flask, request, session
from flask_socketio import join_room, leave_room, send, SocketIO
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

file = "database.sql"

INSTANT_CLIENT_PATH = "./instantclient_23_7"
oracledb.init_oracle_client(INSTANT_CLIENT_PATH)

# Function to execute SQL file
def execute_sql_file(file_path):
    try:
        connection = oracledb.connect(user=DB_USER, password=DB_PASSWORD, dsn=DB_DSN)
        cursor = connection.cursor()

        with open(file_path, 'r') as sql_file:
            sql_statements = sql_file.read()

        for statement in sql_statements.split(";"):
            statement = statement.strip()
            if statement:
                cursor.execute(statement)

        connection.commit()
        cursor.close()
        connection.close()
        print("SQL file executed successfully.")

    except oracledb.Error as e:
        print(f"Error executing SQL file: {e}")
        
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
    rooms[room] = {"members": 0, "messages": [], "users": [{"name": session["name"]}]}
    
    session["room"] = room 
    session["ID"] = request.sid
    
    # Make the creator **JOIN** the room
    join_room(room)
    rooms[room]["members"] += 1  

    socketIO.emit("newRoomCode", {"code": room}, room=request.sid)
    socketIO.emit("updateUsers", rooms[room]["users"], room=room) # Emit updated user list
    socketIO.emit("chatHistory", rooms[room]["messages"], room=request.sid)
    
    print(f"Generated ID: {request.sid} joined room {room}")
    print(f"Current rooms: {rooms}")

@socketIO.on("groupCode")
def join_group(data):
    room = data["code"]
    username = data["username"]

    if room not in rooms:
        print(f"Room {room} not found")
        return 
    
    join_room(room)
    rooms[room]["members"] += 1

    # Check if the user is already in the room
    if not any(user["name"] == username for user in rooms[room]["users"]):
        rooms[room]["users"].append({"name": username}) # Add user to room

    session["room"] = room
    session["name"] = username
    
    send(f"{username} has joined the room.", to=room)
    socketIO.emit("chatHistory", rooms[room]["messages"], room=request.sid)
    socketIO.emit("updateUsers", rooms[room]["users"], room=room) # Emit updated user list

@socketIO.on("sendMessage")
def send_message(data):
    room = data.get("room")
    message = data.get("message")
    username = session.get("name")
    timestamp = datetime.now().strftime('%Y-%m-%d %I:%M %p')
    rooms[room]["messages"].append({"user": username, "message": message, "timestamp": timestamp, "room": room})
    print(f"Message sent in {room} from {username}: {message}")
    socketIO.emit("messageReceived", {"user": username, "message": message, "timestamp": timestamp, "room": room}, room=room)

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
    socketIO.emit("updateUsers", rooms[room]["users"], room=room) # Emit updated user list
    print(f"{name} joined room {room}")

@socketIO.on("disconnect")
def disconnect():
    room = session.get("room")
    name = session.get("name")
    leave_room(room)

    if room in rooms:
        rooms[room]["members"] -= 1
        rooms[room]["users"] = [user for user in rooms[room]["users"] if user["name"] != name] # Remove user from room
        if rooms[room]["members"] <= 0:
            del rooms[room]

    send({"name": name, "message": "has left the room"}, to=room)
    socketIO.emit("updateUsers", rooms[room]["users"], room=room) # Emit updated user list
    print(f"{name} has left room {room}")

if __name__ == "__main__":
    socketIO.run(app,debug=True)
