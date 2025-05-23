import React, { useState, useEffect } from 'react';

const DeleteModal = ({ isOpen, onClose }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="Settingsmodal">
      <div className="Settingsmodal-content">
        <span className="Settingsclose" onClick={onClose}>&times;</span>
        <h2>Delete</h2>
        <div>
          <label>
            Gur Lal
          </label>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;