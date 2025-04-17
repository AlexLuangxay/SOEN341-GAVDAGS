// DeleteModal.jsx
import React from "react";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Delete this message?</h3>
        <p>Are you sure you want to permanently delete this message?</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes, Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
