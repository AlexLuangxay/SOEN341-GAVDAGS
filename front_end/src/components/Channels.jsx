import React from "react";

const Channels = () => {
  const channels = ["Channel 1", "Channel 2", "Channel 3", "Channel 4"]; 
  //I'm assuming this will be dynamically added ^^^

  return (
    <div className="channels">
      <h2>Channels</h2>
      <ul>
        {channels.map((channel, index) => (
          <li key={index}>
            <button>{channel}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
