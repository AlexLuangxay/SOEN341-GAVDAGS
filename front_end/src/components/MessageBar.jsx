import React, { useState } from 'react';

const MessageBar = ({ socket, currentGroup, currentChannel, selectedUser, currentUser }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join('');
    setMessage(transcript);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening((prev) => !prev);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      if (currentGroup) {
        socket.emit('sendMessage', { room: currentGroup, channel: currentChannel, currentUser: currentUser, message, file: selectedFile });
        console.log('Sending message:', message, 'to room:', currentGroup, ' to channel: ', currentChannel,'from: ', currentUser);
      } else if (selectedUser) {
        socket.emit('sendPrivateMessage', { recipient: selectedUser, currentUser: currentUser, message, file: selectedFile });
        console.log('Sending private message:', message, 'to:', selectedUser);
      }
      setMessage('');
      setSelectedFile(null);
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
      <img id="dot" src="circle.png" alt="Status" />
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
      <button className="send-button" onClick={toggleListening} style={{ backgroundColor: isListening ? 'white' : 'transparent' }}>
        <img id="microphone" src='microphone.png' alt="Microphone" />
      </button>
      <button className="send-button" onClick={sendMessage}>
        <img id="send" src="message.png" alt="Send Message" />
      </button>
    </div>
  );
};

export default MessageBar;
