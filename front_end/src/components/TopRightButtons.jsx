import React, { useState } from 'react';
import SettingsModal from '../pages/SettingsModal.jsx';
import AddModal from '../pages/AddModal.jsx';
import DeleteModal from '../pages/DeleteModal.jsx';
import trashIcon from "../../public/trash-bin.png"
import settingsIcon from "../../public/settings-icon.png"
import plusIcon from "../../public/Plus-sign.png"

const TopRightButtons = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };
  const toggleDelete = () => {
    setDeleteOpen(!isDeleteOpen);
  };
  const toggleAdd = () => {
    setAddOpen(!isAddOpen);
  };

  return (
    <>
      <div className="top-right-buttons">
        <button onClick={toggleAdd}><img src={plusIcon} alt="Plus icon" /></button>
        <button onClick={toggleDelete}><img src={trashIcon} alt="Trash bin icon" /></button>
        <button onClick={toggleSettings}><img src={settingsIcon} alt="Settings icon" /></button>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={toggleSettings} />
      <DeleteModal isOpen={isDeleteOpen} onClose={toggleDelete} />
      <AddModal isOpen={isAddOpen} onClose={toggleAdd} />
    </>
  );
};

export default TopRightButtons;
