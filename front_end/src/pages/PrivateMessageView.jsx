import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import "./App.css";
import ChatWindow from "../components/ChatWindowDM";
import People from "../components/People";
import MessageBar from "../components/MessageBar";
import UserSidebarDM from "../components/UserSidebarDM";
import TopLeftButtons from "../components/TopLeftButtons";
import TopRightButtons from "../components/TopRightButtons";
import ChatName from "../components/ChatName";

const socket = io('http://localhost:5001');

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5001/getMessages?user=${selectedUser}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUser]);

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
          window.location.reload();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/");
        window.location.reload();
      }
    };

    checkAuth();

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("privateMessageReceived", (data) => {
      console.log("Socket connected:", socket.connected);
      console.log("New message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("privateMessageReceived");
    };
  }, []);

  const handleUserClick = (userName) => {
    console.log("User clicked:", userName);
    setSelectedUser(userName);
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
          <MessageBar socket={socket} selectedUser={selectedUser}/>
        </main>
        <aside className="right-sidebar">
          <UserSidebarDM selectedUser={selectedUser} />
        </aside>
      </div>
    </div>
  );
}

export default App;