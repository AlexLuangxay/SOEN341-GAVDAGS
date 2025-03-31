import React, { useState, useEffect } from "react";

const UserSidebar = ({ currentGroup }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (currentGroup) {
      fetch("http://localhost:5001/get_group_users", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group: currentGroup }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => console.error("Error fetching group users:", error));
    }
  }, [currentGroup]);

  return (
    <div className="user-sidebar">
      <h3>Users in {currentGroup}</h3>
      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="avatar">
              <img src="profile-user.png" alt="User Avatar" />
            </div>
            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-status">
                <span className={`status-circle ${user.status ? "Online" : "Offline"}`}></span>
                {user.status ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSidebar;