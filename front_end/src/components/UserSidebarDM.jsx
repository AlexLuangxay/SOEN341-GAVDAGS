import React, { useEffect, useState } from "react";

const UserSidebarDM = ({ selectedUser, socket }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserStatus, setCurrentUserStatus] = useState("Offline");
  const [selectedUserStatus, setSelectedUserStatus] = useState("Offline");
  
  // Fetch current user's username and status
  useEffect(() => {
    fetch("http://localhost:5001/current_user", { credentials: "include" }) 
      .then((response) => response.json())
      .then((username) => {
        setCurrentUser(username);
        return fetch(`http://localhost:5001/get_user_status?username=${username}`);
      })
      .then((response) => response.json())
      .then((statusData) => setCurrentUserStatus(statusData.status ? "Online" : "Offline"))
      .catch((error) => console.error("Error fetching current user or status:", error));
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

  // Listen for real-time status updates
  useEffect(() => {
    const handleStatusUpdate = (data) => {
      if (data.username === selectedUser) {
        setSelectedUserStatus(data.status);
      }
    };

    socket.on("statusUpdate", handleStatusUpdate);

    return () => {
      socket.off("statusUpdate", handleStatusUpdate);
    };
  }, [currentUser, selectedUser, socket]);

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
