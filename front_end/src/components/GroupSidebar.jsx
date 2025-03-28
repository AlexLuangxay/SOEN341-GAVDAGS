import React, { useEffect, useState } from "react";

const GroupeSidebar = ({ socket, currentGroup }) => {
  const [members, setMembers] = useState([]);

  // Function to fetch group members
  const fetchGroupMembers = () => {
    if (!currentGroup) return; // Ensure a group is selected

    fetch("http://localhost:5001/get_group_members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group: currentGroup }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching members:", data.error);
        } else {
          setMembers(data.members);
        }
      })
      .catch((error) => console.error("Request failed:", error));
  };

  // Fetch members whenever the group changes
  useEffect(() => {
    fetchGroupMembers();
  }, [currentGroup]);

  return (
    <div className="group-sidebar">
      <h3>Group Members</h3>
      <ul>
        {members.length > 0 ? (
          members.map((member, index) => <li key={index}>{member}</li>)
        ) : (
          <p>No members in this group</p>
        )}
      </ul>
    </div>
  );
};

export default GroupeSidebar;
