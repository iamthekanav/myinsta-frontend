import React from 'react';
import {BrowserRouter as Router,NavLink,Switch} from "react-router-dom";
import "./Header.css";

const Header = (props) => {
    let {isAuth,logout}=props;
    return ( 
        <div className="header"> 
            <div className="header-image">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
            </div>
            <div className="navlinks">
                {isAuth && (
                    <ul className="header-navlinks-ul">
                        <li>
                            <NavLink to="/">HOME</NavLink>
                        </li>
                        <li>
                            <NavLink to="/myprofile">POSTS</NavLink>
                        </li>
                        <li>
                            <NavLink to="/settings">SETTINGS</NavLink>
                        </li>
                        <li>
                            <NavLink to="/loginpage" onClick={()=>{
                                logout();
                            }}>LOGOUT</NavLink>
                        </li>
                    </ul>  
                )}
                {!isAuth && (
                    <ul className="header-navlinks-ul">
                        <li>
                            <NavLink to="/loginpage">LOGIN</NavLink>
                        </li>                       
                    </ul>
                )}
            </div>
        </div>
     );
}
 
export default Header;