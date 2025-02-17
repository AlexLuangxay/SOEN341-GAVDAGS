import React, { useState } from "react"
const MessageBar = ({ socket }) => { // Receive socket as a prop
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")
  const [recipient, setRecipient] = useState("")

  const sendUsername = () => {
    socket.emit("username", username)
  }

  const sendMessage = () => {
    socket.emit("message", { username: recipient, message })
    setMessage("")
  }

  return (
    <div className="message-bar">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />
      <button onClick={sendUsername}>Send</button>

      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Enter Recipient"
      />

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
