import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    // this.props.registerUser(newUser);
    dispatch(registerUser(newUser));
  };

  return (
    <div>
      <section class="container">
        <h1 class="large text-primary">Sign Up</h1>
        <p class="lead">
          <i class="fas fa-user"></i> Create Your Account
        </p>
        <form class="form" noValidate onSubmit={onSubmit}>
          <div class="form-group">
            <input
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.name,
              })}
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
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
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
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
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {errors.password2 && (
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

export default Register;

// function Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       password2: "",
//       errors: {},
//     };
//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }
//   componentDidMount() {
//     const dispatch = useDispatch();
//   }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     // console.log()

//     const newUser = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       password2: this.state.password2,
//     };
//     // this.props.registerUser(newUser);
//     dispatch(registerUser(newUser));
//   }
//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }
//   render() {
//     const { errors } = this.state;
//     return (
//       <div>
//         <section class="container">
//           <h1 class="large text-primary">Sign Up</h1>
//           <p class="lead">
//             <i class="fas fa-user"></i> Create Your Account
//           </p>
//           <form class="form" noValidate onSubmit={this.onSubmit}>
//             <div class="form-group">
//               <input
//                 className={classnames("form-control form-control-lg", {
//                   "is-invalid": errors.name,
//                 })}
//                 type="text"
//                 placeholder="Name"
//                 name="name"
//                 value={this.state.name}
//                 onChange={this.onChange}
//               />
//               {this.state.errors.name && (
//                 <div className="invalid-feedback">{errors.name}</div>
//               )}
//             </div>
//             <div class="form-group">
//               <input
//                 className={classnames("form-control form-control-lg", {
//                   "is-invalid": errors.email,
//                 })}
//                 type="email"
//                 placeholder="Email Address"
//                 value={this.state.email}
//                 name="email"
//                 onChange={this.onChange}
//               />
//               {this.state.errors.email && (
//                 <div className="invalid-feedback">{errors.email}</div>
//               )}
//               <small class="form-text">
//                 This site uses Gravatar so if you want a profile image, use a
//                 Gravatar email
//               </small>
//             </div>
//             <div class="form-group">
//               <input
//                 className={classnames("form-control form-control-lg", {
//                   "is-invalid": errors.password,
//                 })}
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 minLength="6"
//                 value={this.state.password}
//                 onChange={this.onChange}
//               />
//               {this.state.errors.password && (
//                 <div className="invalid-feedback">{errors.password}</div>
//               )}
//             </div>
//             <div class="form-group">
//               <input
//                 className={classnames("form-control form-control-lg", {
//                   "is-invalid": errors.password2,
//                 })}
//                 type="password"
//                 placeholder="Confirm Password"
//                 name="password2"
//                 minLength="6"
//                 value={this.state.password2}
//                 onChange={this.onChange}
//               />
//               {this.state.errors.password2 && (
//                 <div className="invalid-feedback">{errors.pas4}</div>
//               )}
//             </div>
//             <input type="submit" class="btn btn-primary" value="Register" />
//           </form>
//           <p class="my-1">
//             Already have an account? <a href="login.html">Sign In</a>
//           </p>
//         </section>
//       </div>
//     );
//   }
// }

// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors:PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,

// });

// export default connect(mapStateToProps, { registerUser })(Register);
// export default Register;
