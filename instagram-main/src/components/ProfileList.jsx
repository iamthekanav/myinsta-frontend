import React, { Component } from 'react';
import "./ProfileList.css";

const ProfileList = (props) => {
    let {view , users}= props;
    return ( 
        <div className="profile-list">
            <div className="view">
                <h3>{view}</h3>
            </div>
            <div className="user-list">
                {users.map((user)=>{
                    return (
                <div className="user-box">
                    <div className="user-image">
                        <img src={user.pImage} alt=""/>
                    </div>
                    <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-handle">{user.handle}</div>
                    </div>
                </div>);
                })}
            </div>
        </div>
     );
}
 
export default ProfileList;