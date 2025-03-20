import React, { useState, useEffect } from "react";
import AddModal from '../pages/AddModal.jsx';
import DeleteModal from '../pages/DeleteModal.jsx';
import trashIcon from "../../public/trash-bin.png"
import plusIcon from "../../public/Plus-sign.png"

const Channels = () => {
  const channels = ["Channel 1", "Channel 2", "Channel 3", "Channel 4","Channel 5","Channel 6", "Channel 7", "Channel 8", "Channel 9"]; 
  //I'm assuming this will be dynamically added ^^^
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);

  const toggleDelete = () => {
    setDeleteOpen(!isDeleteOpen);
  };
  const toggleAdd = () => {
    setAddOpen(!isAddOpen);
  };

  return ( 
    <div className="channels">
      <div class="div-button69">
        <h2>Channels</h2>
        <button class="button69" onClick={toggleAdd}><img src={plusIcon} alt="Plus icon" /></button>
        <button class="button69" onClick={toggleDelete}><img src={trashIcon} alt="Trash bin icon" /></button>
      </div>
      <div className="channels-list-container"> 
      <ul>
        {channels.map((channel, index) => (
          <li key={index}>
            <button>{channel}</button>
          </li>
        ))}
      </ul>
      </div>
      <DeleteModal isOpen={isDeleteOpen} onClose={toggleDelete} />
      <AddModal isOpen={isAddOpen} onClose={toggleAdd} />
    </div>

  );
};

export default Channels;
