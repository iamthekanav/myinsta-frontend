import React, { Component } from 'react';
import "./Profile.css";
import axios from 'axios';

class Profile extends Component {
    state = { 
        name : "name",
        handle : "username",
        bio: "Bio Loading",
        pImage: 'profile.png',
        postCount : 0,
        followersCount : 0,
        followingCount : 0,
        requestCount : 0
     }
    async componentDidMount(){
        let userData=await axios.get("http://localhost:3000/auth/user");
        // console.log(userData);
        let usergId=userData.data.user.gId;
        let userUidData=await axios.get(`http://localhost:3000/user/uid/${usergId}`);
        let uid=userUidData.data.data[0].uid;
        let userDetails=await axios.get(`http://localhost:3000/user/${uid}`);
        //console.log(user.data.User[0]);
        let user=userDetails.data.User[0];
        let {name, handle, bio,pImage} = user;
        let followingDetails= await axios.get(`http://localhost:3000/user/following/count/${uid}`);
        let followingCount= followingDetails.data.following;
        let followerDetails= await axios.get(`http://localhost:3000/user/follower/count/${uid}`);
        let followersCount=followerDetails.data.following;
        let requestsDetails= await axios.get(`http://localhost:3000/user/request/${uid}`);
        let requestCount= requestsDetails.data.users.length;
        let postsData= await axios.get(`http://localhost:3000/posts/${uid}`);
        let postCount= postsData.data.data.length;
        this.setState({
            name :name,
            handle : handle,
            bio : bio,
            pImage : pImage,
            postCount : postCount,
            followersCount : followersCount,
            followingCount : followingCount,
            requestCount : requestCount
        })
    }
    render() { 
        let {name, handle, bio, pImage, postCount, followersCount, followingCount, requestCount}=this.state;
        let onClickfxn=this.props.handleOnClick;
        return ( 
            <div className="profile">
                <div className="profile-info">
                    <div className="profile-image">
                        <img src={pImage} alt="profile.png"/>
                    </div>
                    <div className="user-name">{name}</div>
                    <div className="user-handle">{handle}</div>
                    <div className="user-bio">{bio}</div>
                </div>
                <div className="profile-stats">
                    <div className="posts">
                        <div className="count">{postCount}</div>
                        Posts
                    </div>
                    <div className="followers">
                        <div className="count">{followersCount}</div>
                        Followers
                    </div>
                    <div className="following">
                        <div className="count">{followingCount}</div>
                        Following
                    </div>
                </div>
                <div className="profile-links">
                    <div className="suggestions" onClick={()=>{onClickfxn("SUGGESTIONS")}}>Suggestions</div>
                    <div className="requests" onClick={()=>{onClickfxn("REQUESTS")}}>Requests : {requestCount}</div>
                    <div className="followers" onClick={()=>{onClickfxn("FOLLOWERS")}}>Followers</div>
                    <div className="following" onClick={()=>{onClickfxn("FOLLOWING")}}>Following</div>
                </div>
            </div>
         );
    }
}
 
export default Profile;