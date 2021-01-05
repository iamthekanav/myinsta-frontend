import React, { Component } from 'react';
import Profile from './Profile';
import ProfileList from './ProfileList';
import "./ProfileView.css";
import axios from 'axios';
import FeedView from "./FeedView";
import MyProfile from './MyProfile';

class ProfileView extends Component {
    state = { 
        currView : "",
        userList : [ ]
     }

    updateView= async (view)=>{
        let userData=await axios.get("http://localhost:3000/auth/user");
        // console.log(userData);
        let usergId=userData.data.user.gId;
        let userUidData=await axios.get(`http://localhost:3000/user/uid/${usergId}`);
        let uid=userUidData.data.data[0].uid;
        if(view == "SUGGESTIONS" && this.state.currView != "SUGGESTIONS"){
            let userObj = await axios.get(`http://localhost:3000/user/${uid}`);
            userObj = userObj.data.User[0];  // user details
            

            let followingObj = await axios.get(`http://localhost:3000/user/following/${uid}`);
            followingObj = followingObj.data.following; // user ki followering

            let follow_arr = [];  //user ki following ki uid
            for (let i = 0; i < followingObj.length && i < 3; i++) {
                follow_arr.push(followingObj[i].uid);
            }
            let followrs = []; //suggestion
            for (let i = 0; i < follow_arr.length; i++) {
                let suggestionObj = await axios.get(`http://localhost:3000/user/following/${follow_arr[i]}`);  //following ki following
                suggestionObj = suggestionObj.data.following;   //following ki following ki details
                //console.log(suggestionObj);
                if(suggestionObj.length>0){
                let followrs_check = suggestionObj.map((obj) => {       //validate suggestions 
                    return obj.uid != userObj.uid && followingObj.every((followers) => {
                        return followers.uid != obj.uid;
                    });
                })
                for(let j =0; j<followrs_check.length;j++){       //adding suggestions
                if(followrs_check[j]==true) followrs.push(suggestionObj[j]);
                }
            }
            }
            let suggestions = [];
            for(let i=0;i<followrs.length;i++){
            suggestions.push({
                id : i+1,
                name : followrs[i].name,
                handle: followrs[i].handle
            })
            };
            this.setState({
                currView: view,
                userList: followrs
            })
        }
        else if(view == "REQUESTS" && this.state.currView != "REQUESTS"){
            let requestsDetails= await axios.get(`http://localhost:3000/user/request/${uid}`);
            let request= requestsDetails.data.users;
            this.setState({
                currView : view,
                userList: request
            })
        }
        else if(view == "FOLLOWERS" && this.state.currView != "FOLLOWERS"){
            let followerDetails= await axios.get(`http://localhost:3000/user/follower/${uid}`);
            let followers=followerDetails.data.following;
            this.setState({
                currView : view,
                userList: followers
            })
            //console.log(followerDetails);

        }
        else if(view =="FOLLOWING" && this.state.currView!="FOLLOWING"){
            let followingDetails= await axios.get(`http://localhost:3000/user/following/${uid}`);
            let following= followingDetails.data.following;
            this.setState({
                currView : view,
                userList: following
            })
            //console.log(followingDetails);
        }
    }
    render() {
        let feedToDisplay=this.props.myFeed;
        return ( 
            <div className="profile-view">
                <Profile handleOnClick={this.updateView}/>
                <ProfileList view={this.state.currView} users={this.state.userList}/>
                {!feedToDisplay && <FeedView/>}
                {feedToDisplay && <MyProfile/>}
            </div>
            
         );
    }
}
 
export default ProfileView;