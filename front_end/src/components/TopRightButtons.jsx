import React from "react";
import trashIcon from "../../public/trash-bin.png"
import settingsIcon from "../../public/settings-icon.png"
const TopRightButtons = () => {
  return (
    <div className="top-right-buttons">
      <button>+</button>
      <button ><img src = {trashIcon} alt = "Trash-bin icon" className="trash-icon"/></button>
      <button><img src = {settingsIcon} alt = "Trash-bin icon" className = "trash-icon"></img></button>
    </div>
  );
};

export default TopRightButtons;