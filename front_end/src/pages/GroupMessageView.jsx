//We need to change this to add routing

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./App.css";
import ChatWindow from "../components/ChatWindow";
import Groups from "../components/Groups";
import Channels from "../components/Channels";
import MessageBar from "../components/MessageBar";
import UserSidebar from "../components/UserSidebar";
import TopLeftButtons from "../components/TopLeftButtons";
import TopRightButtons from "../components/TopRightButtons";
import GroupChatName from "../components/GroupChatName";

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  
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
  })

  return () => {
    socket.off("messageReceived");
  }

  }, []); 

  return (
    <div className="App">
      <header className="top-bar">
        <TopLeftButtons />
        <GroupChatName />
        <TopRightButtons />
      </header>
      <div className="main-container">
        <aside className="left-sidebar">
          <Groups socket={socket}/>
          <Channels />
        </aside>
        <main className="chat-container">
          <ChatWindow messages={messages}/>
          <MessageBar socket={socket}/>
        </main>
        <aside className="right-sidebar">
          <UserSidebar guildId={guildId}/>
        </aside>
      </div>
    </div>
  );
}

export default App;
