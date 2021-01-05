import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePost.css";


class CreatePost extends Component {
    state = {  
        caption:"Enter Caption"
    }
    fileUpload=React.createRef();
    onChangeHandler=(e)=>{
        let newCaption=e.target.value;
        this.setState({
            caption: newCaption
        })
    }
    onSubmitHandler= async (e)=>{
        e.preventDefault();
        let userData=await axios.get("http://localhost:3000/auth/user");
        // console.log(userData);
        let usergId=userData.data.user.gId;
        let userUidData=await axios.get(`http://localhost:3000/user/uid/${usergId}`);
        let uid=userUidData.data.data[0].uid;
        let postCaption=this.state.caption;
        let file=this.fileUpload.current.files[0];
        let formData=new FormData();
        formData.append('postImage', file);
        formData.append('caption', postCaption);
        formData.append('uid', `${uid}`);
        let createPost=await axios.post("http://localhost:3000/post/",formData);
        this.setState({
            caption:"Enter Caption"
        })
        this.props.afterUpload();
    }
    render() { 
        return ( 
            <div className="create-new-post">
                <form onSubmit={(e)=>{this.onSubmitHandler(e)}}>
                <div className="main-create-post">
                    <div className="input-file-post">
                        <input type="file" name="newPost" id="createNewPost" ref={this.fileUpload}/>
                    </div>
                    <div className="create-post-caption-btn">
                        <input type="text" value={this.state.caption} onChange={(e)=>{this.onChangeHandler(e)}} id="create-post-caption"/>
                        <button type="submit">CREATE</button>
                    </div>
                </div>
                </form>
            </div>
         );
    }
}
 
export default CreatePost;