import React from "react";
import trashIcon from "../../public/trash-bin.png"
import settingsIcon from "../../public/settings-icon.png"
import plusIcon from "../../public/Plus-sign.png"

const TopRightButtons = () => {
  return (
    <div className="top-right-buttons">
      <button><img src = {plusIcon} alt = "Plus-icon" className = "trash-icon"></img></button>
      <button ><img src = {trashIcon} alt = "Trash-bin icon" className="trash-icon"/></button>
      <button><img src = {settingsIcon} alt = "Settings icon" className = "trash-icon"></img></button>

    </div>
  );
};

export default TopRightButtons;