import React, { useEffect, useState } from "react";

const UserSidebar = ({ guildId }) => {
  const [users, setUsers] = useState([]);

  useEffect(
    () => {
      const fetch_users_from_guild = async () => {
        if (!guildId) {
          return ;
        }
        const response = await fetch(
          `http://localhost:5001/guild_users?guild_id=${guildId}`,
          {
            method: "GET",
            credentials: "include"
          }
        );

        const data = await response.json();
        console.log(data);
        setUsers(data);
      };

      fetch_users_from_guild();
    },
    [guildId]
  );

  return (
    <div className="user-sidebar">
      {users.map((user, index) =>
        <div key={index} className="user-card">
          <div className="avatar">
            <img src="profile-user.png" alt="User Avatar" />
          </div>
          <div className="user-info">
            <div className="user-name">
              {user.name}
            </div>
            {/*<div className="user-role">{user.role}</div>*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;
