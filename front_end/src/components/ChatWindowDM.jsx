import React, { useEffect } from "react";
import Message from "./Message";

const ChatWindowDM = ({ messages }) => {
  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]); // Logs every time messages change

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.message} user={msg.user} timestamp={msg.timestamp} />
      ))}
    </div>
  );
};

export default ChatWindowDM;