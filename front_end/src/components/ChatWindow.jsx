import React from 'react';
import Message from './Message';

const ChatWindow = () => {
  const messages = [
    { id: 1, text: 'Hello there!', user: 'Other', timestamp: '12:00:00' },
    { id: 2, text: 'Hi!', user: 'Current', timestamp: '12:01:00' },
    // Add more messages here
  ];

  return (
    <div className="chat-window" >
      {messages.map(msg => (
        <Message key={msg.id} text={msg.text} user={msg.user} timestamp={msg.timestamp} />
      ))}
    </div>
  );
};

export default ChatWindow;
