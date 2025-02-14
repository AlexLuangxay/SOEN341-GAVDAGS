import React from 'react';
import Message from './Message';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message key={index} text={msg} />
      ))}
    </div>
  );
};

export default ChatWindow