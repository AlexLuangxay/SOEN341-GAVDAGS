import React, { useState, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to apply dark mode to the body class
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

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
      </div>
    </div>
  );
};

export default SettingsModal;

