import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const audio = new Audio('../../public/audio.mp3');

const SettingsModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const [isShaking, setIsShaking] = useState(() => {
    const savedShakeMode = localStorage.getItem('shakeMode');
    return savedShakeMode === 'true';
  });
  const [isAudio, setIsAudio] = useState(() => {
    const savedAudioMode = localStorage.getItem('AudioMode');
    return savedAudioMode === 'true';
  });

  const handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'GET',
        credentials: 'include', 
      });
  
      if (response.ok) {
        const result = await response.json();
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  const handleToggleShakeMode = () => {
    setIsShaking((prevShaking) => {
      const newShakeMode = !prevShaking;
      localStorage.setItem('shakeMode', newShakeMode);
      return newShakeMode;
    });
  };

  const handleToggleAudioMode = () => {
    setIsAudio((prevAudio) => {
      const newAudioMode = !prevAudio;
      localStorage.setItem('AudioMode', newAudioMode);
      return newAudioMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (isShaking) {
      document.body.classList.add('shake');
    } else {
      document.body.classList.remove('shake');
    }
  }, [isShaking]);

  useEffect(() => {
    if (isAudio) {
      audio.play();
      audio.loop = true;
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isAudio]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="Settingsmodal">
      <div className="Settingsmodal-content">
        <span className="Settingsclose" onClick={onClose}>&times;</span>
        <h2>Settings</h2>
        <div>
          <label>
            Dark Mode:
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleToggleDarkMode}
            />
          </label>
        </div>
        <div>
          <label>
            Shake mode:
            <input
              type="checkbox"
              checked={isShaking}
              onChange={handleToggleShakeMode}
            />
          </label>
        </div>
        <div>
          <label>
            Audio Mode:
            <input
              type="checkbox"
              checked={isAudio}
              onChange={handleToggleAudioMode}
            />
          </label>
        </div>
        <div>
          <button onClick={handleLogOut}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;