import React from "react";

const MessageBar = () => {
  return (
    <div className="message-bar">
      <img id="dot" src="circle.png" alt="User Avatar" />
      <input type="text" placeholder="Message here" className="message-input" />
      <img id="paperclip" src="paperclip.png" alt="User Avatar" />
    </div>
  );
};

export default MessageBar;
