import React from "react";

const users = [
  { name: "Current User", role: "Role" },
  { name: "Other User", role: "Role" },
  { name: "Other User", role: "Role" },
  { name: "Other User", role: "Role" },
];
//I'm assuming this will be dynamically added ^^^

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <div className="avatar">
            <img src="profile-user.png" alt="User Avatar" />
          </div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSidebar;