import React from 'react';
import Message from './Message';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message key={index} username={msg.username} text={msg.text} timestamp={msg.timestamp} />
      ))}
    </div>
  );
};

export default ChatWindow;