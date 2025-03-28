import React, { useEffect, useState } from "react";

const UserSidebarDM = ({ selectedUser }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserStatus, setCurrentUserStatus] = useState("Online");
  const [selectedUserStatus, setSelectedUserStatus] = useState("Offline");

  useEffect(() => {
    fetch("http://localhost:5001/current_user", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => 
        setCurrentUser(data)
      )
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

   // Fetch selected user's status
   useEffect(() => {
    if (selectedUser) {
      fetch(`http://localhost:5001/get_user_status?username=${selectedUser}`)
        .then((response) => response.json())
        .then((statusData) => setSelectedUserStatus(statusData.status ? "Online" : "Offline"))
        .catch((error) => console.error("Error fetching selected user status:", error));
    }
  }, [selectedUser]);

  return (
    <div className="user-sidebar">
      <div className="user-card">
        <div className="avatar">
          <img src="profile-user.png" alt="User Avatar" />
        </div>
        <div className="user-info">
          <div className="user-name">{currentUser ? currentUser : "Loading..."}</div>
          <div className={"user-status"}>
            <span className={`status-circle ${currentUserStatus}`}></span>
            {currentUserStatus}
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
            <div className={"user-status"}>
              <span className={`status-circle ${selectedUserStatus}`}></span>
              {selectedUserStatus}
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default UserSidebarDM;
