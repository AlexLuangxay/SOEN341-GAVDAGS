import React, { useEffect } from "react";
import Message from "./Message";

const ChatWindow = ({ messages }) => {
  
  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]); 

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.message} user={msg.user} timestamp={msg.timestamp} />
      ))}
    </div>
  );
};

export default ChatWindow;