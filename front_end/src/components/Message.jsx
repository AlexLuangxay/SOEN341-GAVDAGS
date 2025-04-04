import React, { useState } from 'react';

const Message = ({ text, user, timestamp }) => {
  const [isGrayscale, setIsGrayscale] = useState(false);

  const messageClass = user === 'Current' ? 'message current-user' : 'message';
  const isImage = typeof text === 'string' && text.startsWith('data:image/');

  const handleDoubleClick = () => {
    setIsGrayscale((prev) => !prev);
  };

  return (
    <div className={messageClass}>
      <div className="message-header">
        <span className="user">{user}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="message-bubble">
        {isImage ? (
          <img
            src={text}
            alt="sent image"
            onDoubleClick={handleDoubleClick}
            style={{
              maxWidth: '200px',
              maxHeight: '200px',
              borderRadius: '10px',
              filter: isGrayscale ? 'grayscale(100%)' : 'none',
              transition: 'filter 0.3s ease'
            }}
          />
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
};

export default Message;