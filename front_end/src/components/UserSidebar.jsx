import React, { useEffect, useState } from "react";

const UserSidebar = ({ selectedUser, status }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/current_user", { credentials: "include" }) 
      .then((response) => response.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  return (
    <div className="user-sidebar">
      <div className="user-card">
        <div className="avatar">
          <img src="profile-user.png" alt="User Avatar" />
        </div>
        <div className="user-info">
          <div className="user-name">{currentUser ? currentUser : "Loading..."}</div>
          <div className={"user-status"}>
              <span className={`status-circle ${status}`}></span>
              {status}
              </div>
        </div>
      </div>

      {selectedUser ? (
        <div className="user-card">
          <div className="avatar">
            <img src="profile-user.png" alt="User Avatar" />
          </div>
          <div className="user-info">
            <div className="user-name">{selectedUser}</div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default UserSidebar;
