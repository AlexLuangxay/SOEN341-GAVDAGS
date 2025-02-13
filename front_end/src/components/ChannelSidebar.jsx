import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Static example of groups and channels */}
      <h3>Groups</h3>
      <ul>
        <li>Group 1</li>
        <li>Group 2</li>
        <li>Group 3</li>
      </ul>
      <h3>Channels</h3>
      <ul>
        <li>Channel 1</li>
        <li>Channel 2</li>
        <li>Channel 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;
