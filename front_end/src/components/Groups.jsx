import React from "react";

const Groups = () => {
  const groups = ["Group 1", "Group 2", "Group 3", "Group 4"]; 

  return (
    <div className="groups">
      <h2>Groups</h2>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            <button>{group}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
