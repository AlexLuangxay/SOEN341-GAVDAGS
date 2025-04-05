import React, { useState, useRef } from 'react';
import DeleteModal from './DeleteModal';

const Message = ({ text, user, timestamp }) => {
  const [showModal, setShowModal] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

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

  const currentFilter = filters[filterIndex];
  const isShake = currentFilter === 'shake';

  const handleClick = () => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      if (clickCountRef.current === 2) {
        setShowModal(true); 
      } else if (clickCountRef.current === 1 && isImage) {
        setFilterIndex((prevIndex) => (prevIndex + 1) % filters.length);
      }
      clickCountRef.current = 0;
    }, 300);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch('http://localhost:5001/deleteMessage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          timestamp,
          message: text,
        }),
      });

      if (response.ok) {
        console.log("Message deleted");
        // Trigger parent state update if needed
      } else {
        console.error("Failed to delete message");
      }
    } catch (err) {
      console.error("Error deleting message", err);
    } finally {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className={messageClass} onClick={handleClick}>
      <div className="message-header">
        <span className="user">{user}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="message-bubble">
        {isImage ? (
          <img
            src={text}
            alt="sent image"
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
      {showModal && <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancel} />}
    </div>
  );
};

export default Message;
