import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SettingsModal from '../pages/SettingsModal.jsx';
import settingsIcon from "../../public/settings-icon.png"


const TopRightButtons = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  const handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:5001/logout', {
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

  return (
    <>
      <div className="top-right-buttons">
        <button onClick={toggleSettings}><img src={settingsIcon} alt="Settings icon" /></button>
        <button onClick={handleLogOut}>Log out</button>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={toggleSettings} />
    </>
  );
};

export default TopRightButtons;
