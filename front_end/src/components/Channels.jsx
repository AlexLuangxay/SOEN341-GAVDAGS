import React, { useState, useEffect } from "react";
import AddModal from '../pages/AddModal.jsx';
import trashIcon from "../public/trash-bin.png";
import plusIcon from "../public/Plus-sign.png";

const Channels = ({ onSelectChannel, currentGroup, channels1, setMessages }) => {
  const [channels, setChannels] = useState([]);
  const [isAddOpen, setAddOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    if (Array.isArray(channels1)) {
      setChannels(channels1);
    }
  }, [channels1]);

  const toggleAdd = () => setAddOpen(!isAddOpen);

  const handleSelectChannel = async (channel) => {
    setSelectedChannel(channel);
  
    try {
      const response = await fetch("http://localhost:5001/getchannelmessages", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channel }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch channel messages");
      }
  
      const data = await response.json();
      console.log(data);
      setMessages(data);
      onSelectChannel(channel, data); // Optionally call the onSelectChannel callback with the fetched messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
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
      
      fetch("http://localhost:5001/fetch_channels", {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group: currentGroup, channel: newChannel })
      })
      .catch(error => console.error('Error sending channel name:', error));
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