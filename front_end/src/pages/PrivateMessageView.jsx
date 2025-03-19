import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./App.css";
import ChatWindow from "../components/ChatWindow";
import People from "../components/People";
import Channels from "../components/Channels";
import MessageBar from "../components/MessageBar";
import UserSidebarDM from "../components/UserSidebarDM";
import TopLeftButtons from "../components/TopLeftButtons";
import TopRightButtons from "../components/TopRightButtons";
import ChatName from "../components/ChatName";

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("messageReceived", (data) => {
      console.log("Socket connected:", socket.connected);
      console.log("New message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("messageReceived");
    };
  }, []);

  // Handle user selection from the People component
  const handleUserClick = (userName) => {
    console.log("User clicked:", userName);
    setSelectedUser(userName); // Update the selected user state
  };

  return (
    <div className="App">
      <header className="top-bar">
        <TopLeftButtons />
        <ChatName />
        <TopRightButtons />
      </header>
      <div className="main-container">
        <aside className="left-sidebar">
          <People socket={socket} handleUserClick={handleUserClick} />
        </aside>
        <main className="chat-container">
          <ChatWindow messages={messages} />
          <MessageBar socket={socket} />
        </main>
        <aside className="right-sidebar">
          {/* Pass the selectedUser to UserSidebarDM */}
          <UserSidebarDM selectedUser={selectedUser} />
        </aside>
      </div>
    </div>
  );
}

export default App;