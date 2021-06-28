import React, { Component } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import store from "./store";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";

if (localStorage.jwtToken) {
  // set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is Authenticated

  store.dispatch(setCurrentUser(decoded));

  // check for expired token

  // const currentTime = Date.now()/1000;
  // if(decoded.exp < currentTime){
  // store.dispatch(clearCurrentProfile())
  //   store.dispatch(logoutUser());
  //   // clear the current profile
  //   // redirect to login
  //   window.location.href  = '/login';
  // }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/dashboard" component={Dashboard}></Route>
            </div>
            <Footer></Footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
