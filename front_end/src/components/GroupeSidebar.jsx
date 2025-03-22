import React, { useEffect, useState } from "react";

const GroupeSidebar = ({ guildMembers }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (guildMembers) {
            setMembers(guildMembers);
        }
    }, [guildMembers]);

    return (
        <div className="sidebar">
            <h2>Guild Members</h2>
            <ul>
                {members.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
        </div>
    );
};

export default GroupeSidebar;