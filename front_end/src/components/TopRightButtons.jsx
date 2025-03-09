import React, { useState } from 'react';
import SettingsModal from '../pages/SettingsModal.jsx'; // adjust the path as necessary
import trashIcon from "../../public/trash-bin.png"
import settingsIcon from "../../public/settings-icon.png"
import plusIcon from "../../public/Plus-sign.png"

const TopRightButtons = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      <div className="top-right-buttons">
        <button><img src={plusIcon} alt="Plus icon" /></button>
        <button><img src={trashIcon} alt="Trash bin icon" /></button>
        <button onClick={toggleSettings}><img src={settingsIcon} alt="Settings icon" /></button>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={toggleSettings} />
    </>
  );
};

export default TopRightButtons;
