import React from "react";
import chatIcon from "../../public/chat-icon.png"
import groupIcon from "../../public/groups-icon.png"
const TopLeftButtons = () => {
  return (
    <div className="top-left-buttons">
      <button><img src = {chatIcon} alt = "chat Icon" className = "group-icon"/></button>
      <button><img src = {groupIcon} alt = "group Icon" className = "group-icon"/></button>
    </div>
  );
};

export default TopLeftButtons;