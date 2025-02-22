import React from 'react';

const Message = ({ username, text, timestamp }) => {
  return (
    <div className='message'>
      <strong className='username'>{username}</strong> <span className='timestamp'>{timestamp}</span>
      <br />
      <div className='text'>{text}</div>
    </div>
  );
};

export default Message;