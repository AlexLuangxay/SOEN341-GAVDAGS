import React from "react";
import { useNavigate } from "react-router-dom";
import chatIcon from "../../public/chat-icon.png";
import groupIcon from "../../public/groups-icon.png";

const TopLeftButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="top-left-buttons">
      <button onClick={() => navigate("/privatemessage")}>
        <img src={chatIcon} alt="Chat Icon" className="group-icon" />
      </button>
      <button onClick={() => navigate("/groupmessage")}>
        <img src={groupIcon} alt="Group Icon" className="group-icon" />
      </button>
    </div>
  );
};

export default TopLeftButtons;