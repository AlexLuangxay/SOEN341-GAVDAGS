import React, { useState } from "react";

const MessageBar = ( {socket} ) => {
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    if (message.trim() !== "") {
      const roomCode = localStorage.getItem("room"); // Store & retrieve the room code
      socket.emit("sendMessage", { room: roomCode, message });
      console.log("Sending message:", message, "to room:", roomCode);
      setMessage(""); // Clear the input field after sending
    }
  }

  return (
    <div className="message-bar">
      <img id="dot" src="circle.png" alt="User Avatar" />
      <input type="text" placeholder="Message here" className="message-input" value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
      }}/>
      <img id="paperclip" src="paperclip.png" alt="User Avatar" />
      <button onClick={sendMessage}>Send</button> {/* Added send button  */}
    </div>
  );
};

export default MessageBar;
