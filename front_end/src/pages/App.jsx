import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import "./App.css";
import ChatWindow from "../components/ChatWindow";
import Groups from "../components/Groups";
import Channels from "../components/Channels";
import MessageBar from "../components/MessageBar";
import UserSidebar from "../components/UserSidebar";
import TopLeftButtons from "../components/TopLeftButtons";
import TopRightButtons from "../components/TopRightButtons";

const socket = io('http://localhost:5000')

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);
  
  return (
    <div className="App">
      <header className="top-bar">
        <TopLeftButtons />
        <TopRightButtons />
      </header>
      <div className="main-container">
        <aside className="left-sidebar">
          <Groups />
          <Channels />
        </aside>
        <main className="chat-container">
          <ChatWindow messages={messages} />
          <MessageBar />
        </main>
        <aside className="right-sidebar">
          <UserSidebar />
        </aside>
      </div>
    </div>
  );
}

export default App