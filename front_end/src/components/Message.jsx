import React from 'react';

const Message = ({ text, user, timestamp }) => {
  const messageClass = user === 'Current' ? 'message current-user' : 'message';
  return (
    <div className={messageClass}>
      <span>{user}</span> <small>{timestamp}</small>
      <br />
      {text} 
    </div>
  );
};

export default Message;
