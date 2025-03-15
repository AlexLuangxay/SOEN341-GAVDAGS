import React, { useState } from 'react';

const MessageBar = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const roomCode = localStorage.getItem('room'); // Store & retrieve the room code
      socket.emit('sendMessage', { room: roomCode, message, file: selectedFile });
      console.log('Sending message:', message, 'to room:', roomCode);
      setMessage(''); // Clear the input field after sending
      setSelectedFile(null); // Clear the selected file after sending
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log('File selected:', event.target.files[0]);
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="message-bar">
      <img id="dot" src="circle.png" />
      <input
        type="text"
        placeholder="Message here"
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button className="send-button" onClick={triggerFileInput}>
        <img id="paperclip" src="paperclip.png" alt="Attach File" />
      </button>
      <button className="send-button" onClick={sendMessage}>
        <img id="send" src="message.png" alt="Send Message" />
      </button>
    </div>
  );
};

export default MessageBar;

