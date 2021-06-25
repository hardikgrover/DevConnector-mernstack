import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import axios from "axios";
import classnames from "classnames";

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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    // console.log()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    axios
      .post("/api/users/register", newUser)
      .then((res) => console.log(res.data))
      .catch((err) => {
        this.setState({ errors: err.response.data });
        // console.log(err.response.data);
        console.log(this.state.errors);
      });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <section class="container">
          <h1 class="large text-primary">Sign Up</h1>
          <p class="lead">
            <i class="fas fa-user"></i> Create Your Account
          </p>
          <form class="form" noValidate onSubmit={this.onSubmit}>
            <div class="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name,
                })}
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              {this.state.errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div class="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email,
                })}
                type="email"
                placeholder="Email Address"
                value={this.state.email}
                name="email"
                onChange={this.onChange}
              />
              {this.state.errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <small class="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div class="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password,
                })}
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={this.state.password}
                onChange={this.onChange}
              />
              {this.state.errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div class="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password2,
                })}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={this.state.password2}
                onChange={this.onChange}
              />
              {this.state.errors.password2 && (
                <div className="invalid-feedback">{errors.pas4}</div>
              )}
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
