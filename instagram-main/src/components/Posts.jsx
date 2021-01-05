import React, { Component } from 'react';
import "./Posts.css";

class Posts extends Component {
    state = {  }

    
    render() { 
        let post=this.props.post;
        let {pid, uid, name,handle,postImage,pImage,caption}=post;
        return ( 
            <div className="post-box">
                <div className="post-header">
                    <div className="post-user-photo">
                        <img src={pImage} alt=""/>
                    </div>
                    <div className="post-user-header-name">{handle}</div>
                </div>
                <div className="post-image-area">
                    <img src={postImage} alt=""/>
                </div>
                <div className="post-stats">
                    <img src="user/like-btn.png" alt=""/>
                </div>
                <div className="post-caption">
                    <div className="caption-name">{name} </div>
                    <div className="caption-caption">{caption}</div>
                    </div>
                <div className="post-comments">Comments</div>
                <div className="add-comments">
                    <input type="text" id="input-comments"/>
                    <div className="btn btn-secondary">Post</div>
                </div>
            </div>
         );
    }
}
 
export default Posts;