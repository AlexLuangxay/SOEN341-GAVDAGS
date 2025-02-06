import React from 'react';

const Message = ({ text, user, timestamp }) => {
  const messageClass = user === 'Current' ? 'message current-user' : 'message';
  return (
    <div className={messageClass}>
      {text} <br />
      <small>{timestamp}</small>
    </div>
  );
};

export default Message;
