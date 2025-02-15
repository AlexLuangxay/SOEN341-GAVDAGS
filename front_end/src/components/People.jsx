import React from "react";

const People = () => {
  const people = ["Person 1", "Person 2", "Person 3" ]; 
  //I'm assuming this will be dynamically added ^^^

  return (
    <div className="channels">
      <h2>People</h2>
      <ul>
        {people.map((people, index) => (
          <li key={index}>
            <button>{people}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default People;