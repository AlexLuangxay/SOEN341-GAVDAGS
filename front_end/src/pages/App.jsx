import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./App.css";
import ChatWindow from "../components/ChatWindow";
import People from "../components/People";
import Channels from "../components/Channels";
import MessageBar from "../components/MessageBar";
import UserSidebar from "../components/UserSidebar";
import TopLeftButtons from "../components/TopLeftButtons";
import TopRightButtons from "../components/TopRightButtons";
import ChatName from "../components/ChatName";
import Groups from '../components/Groups';

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(localStorage.getItem("room") || "");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server"); // Debugging log
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server"); // Debugging log
    });

    socket.on("messageReceived", (data) => {
      console.log("Socket connected:", socket.connected);
      console.log("New message received:", data); // Debugging log
      setMessages((prevMessages) => [...prevMessages, data])
    });
    
    socket.on("chatHistory", (history) => {
      console.log("Received chat history:", history);
      setMessages(history); // Display chat history
    });

    socket.on("updateUsers", (userList) => {
      console.log("Received updated user list:", userList);
      setUsers(userList);
    });
  
    return () => {
      socket.off("messageReceived");
      socket.off("chatHistory");
      socket.off("updateUsers");
    }
  }, []);

  const filteredMessages = messages.filter(msg => msg.room === currentRoom); // Filter messages by room

  return (
    <div className="App">
      <header className="top-bar">
        <TopLeftButtons />
        <ChatName chatName={chatName} />
        <TopRightButtons />
      </header>
      <div className="main-container">
        <aside className="left-sidebar">
          <Groups socket={socket} setChatName={setChatName} setCurrentRoom={setCurrentRoom} curretRoom={currentRoom} />
        </aside>
        <main className="chat-container">
          <ChatWindow messages={filteredMessages}/>
          <MessageBar socket={socket}/>
        </main>
        <aside className="right-sidebar">
          <UserSidebar users={users}/>
        </aside>
      </div>
    </div>
  );
}

export default App;
