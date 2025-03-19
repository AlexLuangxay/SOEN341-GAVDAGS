import React from "react";

const UserSidebarDM = ({ selectedUser }) => {
  console.log("Selected User in UserSidebarDM:", selectedUser);

  return (
        <div className="user-sidebar">
            <div className="user-card">
                <div className="avatar">
                <img src="profile-user.png" alt="User Avatar" />
                </div>
                <div className="user-info">
                <div className="user-name">Current User</div>
            </div>
        </div>
      {/* Display details of the selected user */}
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
        <p>No user selected</p>
      )}
    </div>
  );
};

export default UserSidebarDM;