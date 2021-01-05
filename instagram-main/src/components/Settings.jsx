import React, { Component } from 'react';
import "./Settings.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class Settings extends Component {
    state = {  
        name : "dummy",
        bio : "i am dummy",
        handle : "dummy123",
        email : "dummy@test.com",
        phoneNumber : "9898989898",
        pImage : "",
        isPublic : "true",
        isDisabled : true
    }

    fileUpload=React.createRef();
    componentDidMount=async ()=>{
        let userData=await axios.get("http://localhost:3000/auth/user");
        // console.log(userData);
        let usergId=userData.data.user.gId;
        let userUidData=await axios.get(`http://localhost:3000/user/uid/${usergId}`);
        let uid=userUidData.data.data[0].uid;
        let userDetails=await axios.get(`http://localhost:3000/user/${uid}`);
        //console.log(user.data.User[0]);
        let user=userDetails.data.User[0];
        let {name, handle, bio, phone, pImage, email,is_public} = user;
        this.setState({
            name : name,
            handle : handle,
            bio : bio,
            phoneNumber : phone,
            pImage : pImage,
            email  : email,
            isPublic : is_public,
            isDisabled : true
        })
    }
    onChangeHandler=(event)=>{
        //console.log(event);
        let id= event.target.id;
        let value=event.target.value;
        this.setState({
            [id] : value
        })
    }
    onEdit=()=>{
        if(this.state.isDisabled){
            let newDisabled=!this.state.isDisabled;
            this.setState({
                isDisabled : newDisabled
            })
        }
        else{
            this.componentDidMount();
        }
    }
    onSubmitHandler= async (e)=>{
        e.preventDefault();
        let file = this.fileUpload.current.files[0];
        //console.log(file);
        //console.log(file);
        let formData = new FormData();  
        formData.append('photo', file);  
        formData.append('name' , this.state.name );
        formData.append('handle' , this.state.handle );
        formData.append('bio' , this.state.bio);
        formData.append('email' , this.state.email);
        formData.append('phone' , this.state.phoneNumber);
        formData.append('is_public' , this.state.isPublic);
        let userData=await axios.get("http://localhost:3000/auth/user");
        // console.log(userData);
        let usergId=userData.data.user.gId;
        let userUidData=await axios.get(`http://localhost:3000/user/uid/${usergId}`);
        let uid=userUidData.data.data[0].uid;
        let patchData =await axios.patch(`http://localhost:3000/user/${uid}` , formData);
        console.log(patchData);
        this.componentDidMount();
    }
    render() { 
        let { name , bio, handle, email, phoneNumber, pImage, isPublic,isDisabled} = this.state;
        let onChangeHandler=this.onChangeHandler;
        return ( 
            <div className="settings d-flex justify-content-around">
                <div className="settings_profile_pic">
                    <img src={pImage} alt="Profile.png"/>
                    <input type="file" name="upload" id="photoUpload" ref={this.fileUpload}/>
                </div>
                <div className="settings_user_data">
                    <form onSubmit={(e)=>{this.onSubmitHandler(e)}}>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" value={name} disabled={isDisabled} onChange={(e)=>{onChangeHandler(e)}}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="handle" className="col-sm-2 col-form-label">Handle</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="handle" value={handle} disabled={isDisabled} onChange={(e)=>{onChangeHandler(e)}}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="email" value={email} disabled={isDisabled} onChange={(e)=>{onChangeHandler(e)}}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="bio" className="col-sm-2 col-form-label">Bio</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="bio" value={bio} disabled={isDisabled} onChange={(e)=>{onChangeHandler(e)}}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} disabled={isDisabled} onChange={(e)=>{onChangeHandler(e)}}/>
                        </div>
                    </div>
                    <div className="settings-controls">
                    { isDisabled && <div className="btn btn-primary" onClick={()=>{this.onEdit()}}> EDIT </div> }
                    { !isDisabled && <div className="btn btn-danger" onClick={()=>{this.onEdit()}}> CANCEL CHANGES </div> }
                    <button type="submit" className="btn btn-warning"> SAVE </button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Settings;