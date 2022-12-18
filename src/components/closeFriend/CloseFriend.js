import React from 'react';

const CloseFriend = ({user}) => {
    return (
        <div>
        <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user[1].profilePicture} alt="" />
        <span className="sidebarFriendName">{user[1].username}</span>
        </li>
        </div>
    );
};

export default CloseFriend;