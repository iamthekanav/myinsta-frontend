import React, { Component } from 'react';
import "./LoginPage.css";

class LoginPage extends Component {
    state = {  }
    render() { 
        let {login}=this.props;
        return ( 
            <div className="login-page-main">
                <div className="login-page-box">
                <h2>Welcome To MyInsta</h2>
                <div className="app-logo-login">
                    <img src="user/logo.png" alt=""/>
                </div>
                <div className="sign-in-google">
                    To Continue
                    <div className="sign-in-img" onClick={()=>{
                        login();
                    }}>
                        <img src="user/sing-in.jpg" alt=""/>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default LoginPage;