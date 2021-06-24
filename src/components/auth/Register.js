import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div>
        <section class="container">
          <h1 class="large text-primary">Sign Up</h1>
          <p class="lead">
            <i class="fas fa-user"></i> Create Your Account
          </p>
          <form class="form" action="create-profile.html">
            <div class="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={this.state.email}
                name="email"
                onChange={this.onChange}
              />
              <small class="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div class="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={this.state.password2}
                onChange={this.onChange}
              />
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
          </form>
          <p class="my-1">
            Already have an account? <a href="login.html">Sign In</a>
          </p>
        </section>
      </div>
    );
  }
}

export default connect(null, { registerUser })(Register);
