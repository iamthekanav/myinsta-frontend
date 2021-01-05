import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ProfileView from './components/ProfileView';
import { BrowserRouter as Router, Route,Redirect,Switch} from "react-router-dom";
import Settings from './components/Settings';
import LoginPage from './components/LoginPage';
import axios from "axios";
import UserSignup from './components/UserSignup';

class App extends Component {
  state = { 
    isAuth:false,
    newUser: true
  }
  logout=async ()=>{
    let logOutData=await axios.get("/auth/logout").then(
      (data)=>{
        window.location="/";
      }
    )
  }
  login=()=>{
    window.location="/auth/google";
  }
  onSubmit=()=>{
    console.log("clicked");
    this.setState({
      isAuth : true,
      newUser: false
    })
  }
  componentDidMount=async()=>{
    let checkIsAuth=await axios.get("/auth/checkAuth/").then((data)=>{
    let currIsAuth=data.data.isAuth;
    let currUser=data.data.user;
    this.setState({
          isAuth: currIsAuth,
          newUser: currUser
    })})
    }
  render() { 
    let isAuth=this.state.isAuth;
    let newUser=this.state.newUser;
    let logout=this.logout;
    let login=this.login;
    return ( 
      <Router>
      <React.Fragment>
        <Header isAuth={isAuth} newUser={newUser} logout={logout}/>
        <Switch>
          <Route path="/" exact>
            {isAuth && !newUser && (<ProfileView myFeed={false}/>)}
            {isAuth && newUser && (<UserSignup onSubmit={this.onSubmit}/>)}
            {!isAuth && (<Redirect to="/loginpage"></Redirect>)}
          </Route>
          <Route path="/settings" exact>
            {isAuth && (<Settings/>)}
            {!isAuth && (<Redirect to="/loginpage"></Redirect>)}
          </Route>
          <Route path="/myprofile" exact>
            {isAuth && (<ProfileView myFeed={true}/>)}
            {!isAuth && (<Redirect to="/loginpage"></Redirect>)}           
          </Route>
          <Route path="/loginpage" exact>
            {isAuth && (<Redirect to="/"></Redirect>)}
            {!isAuth && (<LoginPage isAuth={isAuth} logout={logout} login={login}/>)}
          </Route>
        </Switch>
      </React.Fragment>
      </Router>
     );
  }
}
 

export default App;
