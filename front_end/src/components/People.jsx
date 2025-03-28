import React, { useEffect, useState } from "react";

const People = ({ handleUserClick }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5001/users", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="people">
      <h2>Private Messages</h2>
      <div className="user-list">
        {error ? (
          <p>Error: {error}</p>
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <button
              key={index}
              className="user-card"
              onClick={() => handleUserClick(user.name)} 
            >
              <div className="avatar">
                <img src="profile-user.png" alt="User Avatar" />
              </div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
              </div>
            </button>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default People;