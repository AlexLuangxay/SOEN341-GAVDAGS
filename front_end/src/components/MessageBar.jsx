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

  const compressImage = (file, maxWidth = 300, maxHeight = 300, quality = 0.6) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = (e) => {
        img.src = e.target.result;
      };
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
  
        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
  
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
  
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
  
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
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
    const outgoingMessage = message.trim() !== '' ? message : selectedFile;
  
    if (outgoingMessage) {
      if (currentGroup) {
        socket.emit('sendMessage', {
          room: currentGroup,
          channel: currentChannel,
          currentUser: currentUser,
          message: outgoingMessage
        });
        //console.log('Sending message (text or image):', outgoingMessage, 'to room:', currentGroup, 'channel:', currentChannel, 'from:', currentUser);
      } else if (selectedUser) {
        socket.emit('sendPrivateMessage', {
          recipient: selectedUser,
          currentUser: currentUser,
          message: outgoingMessage
        });
        //console.log('Sending private message (text or image):', outgoingMessage, 'to:', selectedUser);
      }
  
      setMessage('');
      setSelectedFile(null);
    }
  };
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const compressedBase64 = await compressImage(file, 300, 300, 0.6);
        setSelectedFile(compressedBase64); 
        //console.log('Compressed Base64 image ready:', compressedBase64.substring(0, 100) + '...');
      } catch (error) {
        console.error('Failed to compress image:', error);
      }
    } else {
      alert('Please select a valid image file.');
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
