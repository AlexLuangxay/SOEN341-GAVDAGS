import React, { useState, useEffect } from 'react';
const audio = new Audio('../../public/audio.mp3');

const SettingsModal = ({ isOpen, onClose }) => {
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
  const [isReverse, setIsReverse] = useState(() => {
    const savedReverseMode = localStorage.getItem('reverseMode');
    return savedReverseMode === 'true';
  });


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

  const handleToggleReverseMode = () => {
    setIsReverse((prevReverse) => {
      const newReverseMode = !prevReverse;
      localStorage.setItem('reverseMode', newReverseMode);
      return newReverseMode;
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
    if (isReverse) {
      document.body.classList.add('reverse');
    } else {
      document.body.classList.remove('reverse');
    }
  }, [isReverse]);

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
          <label>
            Reverse Mode:
            <input
              type="checkbox"
              checked={isReverse}
              onChange={handleToggleReverseMode}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;