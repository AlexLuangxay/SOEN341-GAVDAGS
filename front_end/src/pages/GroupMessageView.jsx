import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const socket = io('http://localhost:5001');

function App() {
  const [messages, setMessages] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [channels1, setChannels1] = useState([]);
  
  const navigate = useNavigate();

  const handleSelectChannel = (channel, fetchedMessages = []) => {
    setSelectedChannel(channel);
    setMessages(fetchedMessages);  // Pass setMessages down as part of the state
  };

  useEffect(() => {
    fetch("http://localhost:5001/current_user", { credentials: "include" }) 
      .then((response) => response.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5001/current_user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          console.log("Unauthorized access, redirecting to login.");
          navigate("/"); 
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/"); 
      }
    };

    checkAuth();

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
  }, [navigate]);

  return (
    <div className="App">
      <header className="top-bar">
        <TopLeftButtons />
        <GroupChatName groupName={groupName} chatName={selectedChannel}/>
        <TopRightButtons />
      </header>
      <div className="main-container">
        <aside className="left-sidebar">
          <Groups socket={socket} setGroupName={setGroupName} setCurrentGroup={setCurrentGroup} setChannels1={setChannels1} setMessages={setMessages}/>
          {currentGroup && <Channels onSelectChannel={handleSelectChannel} currentGroup={currentGroup} channels1={channels1} setMessages={setMessages}/>}
        </aside>
        <main className="chat-container">
          <ChatWindow messages={messages}/>
          <MessageBar socket={socket} currentGroup={currentGroup} currentChannel={selectedChannel} currentUser={currentUser}/>
        </main>
        <aside className="right-sidebar">
          <UserSidebar currentGroup={currentGroup} socket = {socket}/>
        </aside>
      </div>
    </div>
  );
}

export default App;