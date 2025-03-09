import React, { useState } from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Here you would also handle the actual theme change logic
  };

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


