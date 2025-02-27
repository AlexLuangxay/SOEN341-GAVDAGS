import React from "react";

const users = [
  { name: "Other User 1" },
  { name: "Other User 2" },
  { name: "Other User 3" },
  { name: "Other User 4" },
  { name: "Other User 5" },
  { name: "Other User 6" },
  { name: "Other User 7" },
  { name: "Other User 8" },
  { name: "Other User 9" },
  { name: "Other User 10" },
  { name: "Other User 11" },
  { name: "Other User 12" },
  { name: "Other User 13" },
  { name: "Other User 14" },
];

const People = () => {
  const handleUserClick = (userName) => {
    console.log(`Clicked on: ${userName}`);
  };

  return (
    <div className="user-sidebar">
      <h2>Private Messages</h2>
      <div className="user-list">
        {users.map((user, index) => (
          <button key={index} className="user-card" onClick={() => handleUserClick(user.name)}>
            <div className="avatar">
              <img src="profile-user.png" alt="User Avatar" />
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default People;
