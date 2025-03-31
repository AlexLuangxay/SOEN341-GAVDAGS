import React, { useEffect, useRef } from "react";
import Message from "./Message";

const ChatWindowDM = ({ messages }) => {
const chatEndRef = useRef(null);

  useEffect(() => {
    console.log("Messages updated:", messages);
    if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
  }, [messages]); // Logs every time messages change

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.message} user={msg.user} timestamp={msg.timestamp} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindowDM;