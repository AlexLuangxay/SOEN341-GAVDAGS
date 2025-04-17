import React from "react";

const GroupChatName = ({ groupName, chatName }) => {
  return (
    <div className="group-chat-name">
      <h1>{groupName}</h1>
      {<h2>{chatName}</h2>}
    </div>
  );
};

export default GroupChatName;
