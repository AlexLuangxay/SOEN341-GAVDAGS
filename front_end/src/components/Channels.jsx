import React, { useState } from "react";
import AddModal from '../pages/AddModal.jsx';
import trashIcon from "../public/trash-bin.png";
import plusIcon from "../public/Plus-sign.png";

const Channels = ({ onSelectChannel }) => {
  const [channels, setChannels] = useState([
    "Channel 1", "Channel 2", "Channel 3", 
    "Channel 4", "Channel 5", "Channel 6", 
    "Channel 7", "Channel 8", "Channel 9"
  ]);

  const [isAddOpen, setAddOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const toggleAdd = () => {
    setAddOpen(!isAddOpen);
  };

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
    onSelectChannel(channel);
  };

  const handleDeleteChannel = () => {
    if (selectedChannel) {
      setChannels(channels.filter(channel => channel !== selectedChannel));
      setSelectedChannel(null);
      onSelectChannel('');
    }
  };

  const handleAddChannel = (newChannel) => {
    if (newChannel && !channels.includes(newChannel)) {
      setChannels([...channels, newChannel]);
    }
  };

  return ( 
    <div className="channels">
      <div className="div-button69">
        <h2>Channels</h2>
        <button className="button69" onClick={toggleAdd}>
          <img src={plusIcon} alt="Plus icon" />
        </button>
        <button className="button69" onClick={handleDeleteChannel}>
          <img src={trashIcon} alt="Trash bin icon" />
        </button>
      </div>
      <div className="channels-list-container"> 
        <ul>
          {channels.map((channel, index) => (
            <li key={index}>
              <button 
                onClick={() => handleSelectChannel(channel)}
                className={selectedChannel === channel ? "selected" : ""}
              >
                {channel}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AddModal isOpen={isAddOpen} onClose={toggleAdd} onAddChannel={handleAddChannel} />
    </div>
  );
};

export default Channels;
