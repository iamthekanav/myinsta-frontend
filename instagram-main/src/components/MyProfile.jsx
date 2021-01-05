import React, { Component } from 'react';
import Post from "./Posts";
import axios from "axios";
import CreatePost from './CreatePost';
import "./MyProfile.css";

class MyProfile extends Component {
    state = { 
        posts: [{
            pid : 1,
            uid : 1,
            name : "Dummy User",
            handle: "iamdummy",
            pImage : "user/profile.png",
            postImage: "user/profile.png",
            caption : "My Post"
        },{
            pid : 2,
            uid : 1,
            name : "Dummy User 2",
            handle: "iamdummy",
            pImage : "user/profile.png",
            postImage: "user/profile.png",
            caption : "My Post"
        },{
            pid : 3,
            uid : 1,
            name : "Dummy User 3",
            handle: "iamdummy",
            pImage : "user/profile.png",
            postImage: "user/profile.png",
            caption : "My Post"
        },{
            pid : 4,
            uid : 1,
            name : "Dummy User 4",
            handle: "iamdummy",
            pImage : "user/profile.png",
            postImage: "user/profile.png",
            caption : "My Post"
        }],
        addAPost: false
     }
     async componentDidMount(){
        let userData=await axios.get("http://localhost:3000/auth/user");
        // console.log(userData);
        let usergId=userData.data.user.gId;
        let userUidData=await axios.get(`http://localhost:3000/user/uid/${usergId}`);
        let uid=userUidData.data.data[0].uid;
        let postDetails=await axios.get(`http://localhost:3000/posts/${uid}/`);
        let postData=postDetails.data.data;
        // let postData=userDetails.data.data;
        // let allUsers=[];
        // for(let i=0;i<users.length;i++){
        //     let uid=users[i];
        let mySelfdata=await axios.get(`http://localhost:3000/user/${uid}`);
        let mySelf=mySelfdata.data.User[0];
        //     allUsers.push(oneUser.data.User[0]);
        // }
        let allPosts=[];
        for(let i=0;i<postData.length;i++){
            let post={
                pid : postData[i].pid,
                uid : mySelf.uid,
                name : mySelf.name,
                handle: mySelf.handle,
                caption : postData[i].caption,
                pImage: mySelf.pImage,
                postImage : postData[i].postImage
            }
            allPosts.push(post);
        }
        this.setState({
            posts: allPosts,
            addAPost: false
        })

    }
    uploadedPosts=()=>{
        this.componentDidMount();
    }
    onAddPostClick=()=>{
        let curraddAPost=this.state.addAPost;
        this.setState({
            addAPost : !curraddAPost
        })
    }
    render() { 
        let posts=this.state.posts;
        return (
            <div className="feeds"> 
                <h3>MY FEEDS</h3>
                {!this.state.addAPost && <div className="add-post-btn" onClick={(e)=>{this.onAddPostClick(e)}} >
                    <img src="user/add-btn.png" alt=""/>
                </div>}
                {this.state.addAPost && <CreatePost afterUpload={this.uploadedPosts}/>}
                <div className="user-postview">
                    {posts.map((post)=>{
                        return (
                            <Post key={post.pid} post={post}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}
 
export default MyProfile;