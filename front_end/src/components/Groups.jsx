import React, { useState, useEffect } from "react";

const Groups = ( { socket, setChatName, setCurrentRoom, currentRoom } ) => {
  const [code, setCode] = useState("") // State for input field 
  const [groups, setGroups] = useState([]);
  const [username, setCurrentUser] = useState(""); // Store logged-in user

  useEffect(() => {
    fetch("http://localhost:5000/current_user", { credentials: "include" }) 
      .then((response) => response.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  const sendJoinCode = () => {
    if (code.trim() !== "") {
    socket.emit("joinSignal", {code, username})
    setGroups((prevGroups) => [...prevGroups, code]); // Add the new room to the groups list
    }
  }

  const sendCreateSignal = () => {
      socket.emit("createSignal", {username});
  };
  
  useEffect(() => {
    socket.on("newRoomCode", (data) => {
      console.log("Received event:", data);
      console.log("Frontend username:", username);
      setGroups((prevGroups) => [...prevGroups, data.group_name]); // Add the new room to the groups list
    });
  
    return () => {
      socket.off("newRoomCode"); // Cleanup listener on unmount
    };
  }, []);

  // const switchRoom = (group) => {
  //   if (currentRoom !== group) {
  //     //socket.emit("groupCode", { code: group, username }); // Emit to request chat history for the selected room
  //     localStorage.setItem("room", group); // Store the selected room
  //     setChatName(group); // Update chat name
  //     setCurrentRoom(group);
  //     console.log("Switched to room:", group);
  //   }
  // };

  return (

    <div className="groups">
      <h2>Groups</h2>

      <div className="join">
          <input type="text" placeholder="Room Code" class="input" name="code" value={code} onChange={(e) => setCode(e.target.value)}/>
        <div className="button-container">
          <button onClick={sendJoinCode} type="submit" className="groups-btn" name="join">Join</button>
          <button onClick={sendCreateSignal} name="create" className="groups-btn">Create</button>
        </div>
      </div>
      <div className="groups-list-container">
        <ul>
          {groups.map((group, index) => (
            <li key={index}>
              <button onClick={() => switchRoom(group)}
                className={currentRoom === group ? "selected" : ""}
                >{group}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
};

export default Groups;
