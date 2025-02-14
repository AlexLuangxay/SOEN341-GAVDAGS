import React, { useState } from "react";
import io from "socket.io-client"

const socket = io('http://localhost:5000')

const MessageBar = () => {
  const [message, setMessage] = useState("")
 
  const sendMessage = () => {
    socket.emit("message", message)
    setMessage("")
  };

  return (
    <div className="message-bar">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message here"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageBar;
