import React, { useState, useEffect} from "react";

const Groups = ( {socket} ) => {
  const [code, setCode] = useState("") // State for input field 
  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(""); // State for selected group
  const [isUsernameEntered, setIsUsernameEntered] = useState(false); // State to track if username is entered

    useEffect(() => {
        // Listen for new room codes from backend
        socket.on("newRoomCode", (data) => {
            setGroups((prevGroups) => [...prevGroups, data.code]);
        });

        return () => {
            socket.off("newRoomCode"); // Cleanup listener on unmount
        };
  }, []);
  // // // // // // // // // // // 
  

  const sendJoinCode = () => {
    if (code.trim() !== "" && username.trim() !== "") {
    socket.emit("groupCode", {code, username})
    localStorage.setItem("room", code); // Store room code for future use
    setCode("") // Clear the input field after sending 
    } else {
      console.log("You must enter a username before creating a group.") // Show this to user 
    }
  }

  const sendCreateSignal = () => {
    if (isUsernameEntered) {
      socket.emit("createSignal")
    } else {
      console.log("You must enter a username before creating a group.") // Show this to user 
    }
  }

  const sendUsername = () => {
    if (username.trim() !== "") {
      socket.emit("username", username)
      setIsUsernameEntered(true);
    } else {
      console.log("Username cannot be empty.") // Show this to user 
    }
  }

  const setRoom = (group) => {
    localStorage.setItem("room", group); // Store selected room
    setSelectedGroup(group);
    console.log("Current Room Set:", group);
  };


  return (

    <div className="groups">
      
      {/* FRONT END MODIFY CODE HERE! */}
      <input
        type="text" value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />
      <button onClick={sendUsername}>Enter </button>

      <h2>Groups</h2>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            <button onClick={() => setRoom(group)}
              className={selectedGroup === group ? "selected" : ""}
              >{group}
            </button>
          </li>
        ))}
      </ul>

      <div className="join">
        <input type="text" placeholder="Room Code" name="code" value={code} onChange={(e) => setCode(e.target.value)}/>
        <button onClick={sendJoinCode} type="submit" name="join">Join a room</button>
      </div>
      <button onClick={sendCreateSignal} name="create" className="create-btn" >Create a room</button>
      {/* // // // // // // // // // // */}
    </div>
  );
};

export default Groups;
