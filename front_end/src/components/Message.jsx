import React from 'react';

const Message = ({ text, user, timestamp }) => {
  const messageClass = user === 'Current' ? 'message current-user' : 'message';
  return (
    <div className={messageClass}>
      <div className="message-header">
        <span className="user">{user}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="message-bubble">
        {text}
      </div>
    </div>
  );
};

export default Message;
