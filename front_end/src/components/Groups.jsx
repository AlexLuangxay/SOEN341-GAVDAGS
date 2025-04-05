import React, { useState, useEffect } from "react";

const Groups = ( { socket, setGroupName, setCurrentGroup, currentGroup, setChannels1, setMessages } ) => {
  const [code, setCode] = useState("") // State for input field 
  const [groups, setGroups] = useState([]);
  const [username, setCurrentUser] = useState(""); // Store logged-in user

  useEffect(() => {
    fetch("http://localhost:5001/current_user", { credentials: "include" }) 
      .then((response) => response.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error("Error fetching user:", error));

    fetch("http://localhost:5001/get_user_groups", { credentials: "include" })
    .then((response) => {
      console.log("Raw response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("User's groups:", data);
      setGroups(data); // Set the fetched groups
    })
    .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  const sendJoinCode = () => {
    if (code.trim() !== "") {
      console.log(code);
      setGroupName(code); // Update group name with the generated room code
      socket.emit("joinSignal", {code, username})
    }
  }

  const sendCreateSignal = () => {
      socket.emit("createSignal", {username});
  };
  
  useEffect(() => {
    socket.on("newRoomCode", (data) => {
      console.log("Received event:", data);
      console.log("Frontend username:", username);
      setCurrentGroup(data.group_name); // Update current group
      setGroupName(data.group_name); // Update group name with the generated room code
      setGroups((prevGroups) => [...prevGroups, data.group_name]); // Add the new room to the groups list
    });
  
    return () => {
      socket.off("newRoomCode"); // Cleanup listener on unmount
    };
  }, [socket, username]);

  const switchRoom = (group) => {
    if (currentGroup !== group) {
      setGroupName(group); 
      setCurrentGroup(group);
      setMessages([]); // Clear ChatWindow
      console.log("Switched to room:", group);

      // Emit joinSignal when switching groups
      socket.emit("joinSignal", { code: group, username });
    }
        
    fetch("http://localhost:5001/channels", {
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ group: group })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Channels received:", data);
      setChannels1(data);
    })
    .catch(error => {
      console.error('Error sending channel name:', error);
    });
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
