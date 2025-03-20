import React from "react";

const GroupChatName = ({ groupName }) => {
    const chatName = "Chat Name";
  
    return (
        <div className="groupChatName">
            <h1>{groupName}</h1>
            <h2>{chatName}</h2>
        </div>
    );
  };

export default GroupChatName