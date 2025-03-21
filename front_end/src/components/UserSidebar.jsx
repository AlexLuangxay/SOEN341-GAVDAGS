import React, { useEffect, useState } from "react";

const UserSidebar = ( {guildId} ) => {
  const [users, setUsers] = useState([]);

useEffect(() => {
    const fetch_users_from_guild = async () => {
        const response = await fetch(`http://localhost:5001/server/${guildId}/users`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        setUsers(data);
    };

    fetch_users_from_guild();
    
  }, [guildId]);

  return (
    <div className="user-sidebar">
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <div className="avatar">
            <img src="profile-user.png" alt="User Avatar" />
          </div>
          <div className="user-info">
            <div className="user-name">{user.client_username}</div>
            {/*<div className="user-role">{user.role}</div>*/}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSidebar;