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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };  

  const sendMessage = () => {
    // Use the typed message or the Base64 image string
    const outgoingMessage = message.trim() !== '' ? message : selectedFile;
  
    if (outgoingMessage) {
      if (currentGroup) {
        socket.emit('sendMessage', {
          room: currentGroup,
          channel: currentChannel,
          currentUser: currentUser,
          message: outgoingMessage
        });
        console.log('Sending message (text or image):', outgoingMessage, 'to room:', currentGroup, 'channel:', currentChannel, 'from:', currentUser);
      } else if (selectedUser) {
        socket.emit('sendPrivateMessage', {
          recipient: selectedUser,
          currentUser: currentUser,
          message: outgoingMessage
        });
        console.log('Sending private message (text or image):', outgoingMessage, 'to:', selectedUser);
      }
  
      setMessage('');
      setSelectedFile(null);
    }
  };
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      try {
        const base64 = await convertToBase64(file);
        setSelectedFile(base64); 
        console.log('Base64 PNG file ready:', base64.substring(0, 100) + '...');
      } catch (error) {
        console.error('Failed to convert image to Base64:', error);
      }
    } else {
      alert('Please select a PNG image.');
    }
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
      {selectedFile && (
        <img src={selectedFile} alt="Preview" style={{ maxHeight: '30px', marginLeft: '10px' }} />
      )}
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
