import React, { Component } from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <Route exact path="/" component={Landing} />
            <div className="container">
              {/* <Route exact path="/login" component={Login}></Route> */}
              <Route exact path="/register" component={Register}></Route>
            </div>
            <Footer></Footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
