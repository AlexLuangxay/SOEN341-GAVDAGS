import React, { useEffect, useState } from "react";

const People = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      
        const response = await fetch("http://localhost:5000/users", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        console.log(data);
        setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userName) => {
    console.log(`Yes, this works.`);
    //ADD THE LOGIC HERE TO SWITCH PRIVATE MESSAGE CHANNELS
  };

  return (
    <div className="people">
      <h2>Private Messages</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : users.length > 0 ? (
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
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default People;
