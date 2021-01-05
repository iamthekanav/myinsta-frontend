import React, { Component } from 'react';
import "./UserSignup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Settings.css";
import axios from "axios";

class UserSignup extends Component {
    state = {  
        name : "dummy",
        bio : "i am dummy",
        handle : "dummy123",
        email : "dummy@test.com",
        phoneNumber : "000000000",
        pImage : "profile.png",
        isPublic : "true",
        isDisabled : true,
        gId : "1234a"
    }

    fileUpload=React.createRef();
    componentDidMount=async ()=>{
        let userDetails=await axios.get("http://localhost:3000/auth/user");
        let user=userDetails.data.user;
        console.log(userDetails.data.user);
        //let user=userDetails.data.User[0];
        let {gId,name,pImage, email} = user;
        console.log(gId,name,pImage,email);
        this.setState({
            name : name,
            pImage : pImage,
            email  : email,
            gId : gId
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
    onSubmitChange=()=>{
        this.props.onSubmit();
    }
    onSubmitHandler= async (e)=>{
        // let onSubmit=this.props.onSubmit;
        console.log("save clicked");
        e.preventDefault();
        let file = this.fileUpload.current.files[0];
        // console.log(file);
        //console.log(file);
        //console.log(file);
        let formData = new FormData();  
        formData.append('photo', file);  
        formData.append('gId',this.state.gId);
        formData.append('name' , this.state.name );
        formData.append('handle' , this.state.handle );
        formData.append('bio' , this.state.bio);
        formData.append('email' , this.state.email);
        formData.append('phone' , this.state.phoneNumber);
        formData.append('is_public' , this.state.isPublic);
        console.log(formData.get("photo"));
        let patchData =await axios.post("http://localhost:3000/user/" , formData);

        console.log(patchData);
        // this.componentDidMount();
        this.onSubmitChange();
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
 
export default UserSignup;