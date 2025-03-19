import React, { useState, useEffect } from "react";

const Groups = ( { socket, setChatName, setCurrentRoom, currentRoom } ) => {
  const [code, setCode] = useState("") // State for input field 
  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState("");
  const [isUsernameEntered, setIsUsernameEntered] = useState(false); // State to track if username is entered

  const sendJoinCode = () => {
    if (code.trim() !== "" && isUsernameEntered) {
    socket.emit("groupCode", {code, username})
    localStorage.setItem("room", code); // Store room code for future use
    setChatName(code); // Update chat name
    setCurrentRoom(code); // Set current room
    setCode("") // Clear the input field after sending 
    setGroups((prevGroups) => [...prevGroups, code]); // Add the new room to the groups list
    } else if (!isUsernameEntered) {
      console.log("You must enter a username before joining a group.") // Show this to user 
    } else if (code.trim() === "") {
      console.log("Room code cannot be empty.") // Show this to user 
    } else {
      console.log("Invalid room code.") // Show this to user
    }
  }

  const sendCreateSignal = () => {
    socket.emit("createSignal");
  };
  
  useEffect(() => {
    socket.on("newRoomCode", (data) => {
      setChatName(data.code); // Update chat name with the generated room code
      setGroups((prevGroups) => [...prevGroups, data.code]); // Add the new room to the groups list
      localStorage.setItem("room", data.code); // Store the generated room code
      setCurrentRoom(data.code);
    });
  
    return () => {
      socket.off("newRoomCode"); // Cleanup listener on unmount
    };
  }, []);

  const switchRoom = (group) => {
    if (currentRoom !== group) {
      socket.emit("groupCode", { code: group, username }); // Emit to request chat history for the selected room
      localStorage.setItem("room", group); // Store the selected room
      setChatName(group); // Update chat name
      setCurrentRoom(group);
      console.log("Switched to room:", group);
    }
  };

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
