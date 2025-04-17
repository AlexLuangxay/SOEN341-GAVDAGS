import React, { useEffect } from "react";
import Message from "./Message";

const ChatWindow = ({ socket, messages, setMessages, currentGroup, currentChannel }) => {

  useEffect(() => {
    socket.on('messageDeleted', ({ user, timestamp, message }) => {
      setMessages((prevMessages) =>
        prevMessages.filter(
          (msg) => !(msg.user === user && msg.timestamp === timestamp && msg.message === message)
        )
      );
    });

    return () => {
      socket.off('messageDeleted');
    };
  }, [setMessages]); // Always good to include setMessages as dependency

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message
          socket={socket}
          key={index}
          text={msg.message}
          user={msg.user}
          timestamp={msg.timestamp}
          currentGroup={currentGroup}
          currentChannel={currentChannel}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
