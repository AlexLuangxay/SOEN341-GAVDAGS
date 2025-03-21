import React, { useState } from 'react';

const AddModal = ({ isOpen, onClose, onAddChannel }) => {
  const [newChannel, setNewChannel] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleAdd = () => {
    if (newChannel.trim() !== "") {
      onAddChannel(newChannel);
      setNewChannel("");
      onClose();
    }
  };

  return (
    <div className="Settingsmodal">
      <div className="Settingsmodal-content">
        <span className="Settingsclose" onClick={onClose}>&times;</span>
        <h2>Add Channel</h2>
        <div style={{ marginTop: "10px" }}>
          <input 
            type="text" 
            value={newChannel} 
            onChange={(e) => setNewChannel(e.target.value)} 
            placeholder="Enter channel name"
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
