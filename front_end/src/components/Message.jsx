import React, { useState } from 'react';

const Message = ({ text, user, timestamp }) => {
  const [filterIndex, setFilterIndex] = useState(0);

  const messageClass = user === 'Current' ? 'message current-user' : 'message';
  const isImage = typeof text === 'string' && text.startsWith('data:image/');

  const filters = [
    'none',
    'grayscale(100%)',
    'invert(100%)',
    'sepia(100%)',
    'contrast(200%) brightness(80%)',
    'hue-rotate(90deg)',
    'blur(2px)',
    'brightness(1.5) saturate(2)',
    'shake'
  ];

  const handleDoubleClick = () => {
    setFilterIndex((prevIndex) => (prevIndex + 1) % filters.length);
  };

  const currentFilter = filters[filterIndex];
  const isShake = currentFilter === 'shake';

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
            className={isShake ? 'shake' : ''}
            style={{
              maxWidth: '200px',
              maxHeight: '200px',
              borderRadius: '10px',
              filter: isShake ? 'none' : currentFilter,
              transition: 'filter 0.3s ease'
            }}
          />
        ) : (
          <p style={{ margin: '0px' }}>{text}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
