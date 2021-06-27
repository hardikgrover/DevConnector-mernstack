import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const errors1 = useSelector((state) => state.errors);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // console.log(errors1);
  // setErrors(errors1);
  useEffect(() => {
    // const errors1 = useSelector((state) => state.errors);
    // console.log(errors);
    if (isAuthenticated) {
      history.push("/dashboard");
    }
    if (errors1) {
      setErrors(errors1);
    }
  }, [errors1]);
  useEffect(() => {
    if (isAuthenticated) {
      alert("user is authenticated");
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
    dispatch(loginUser(user));
  };
  return (
    <section class="container">
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Sign into Your Account
      </p>
      <form class="form" action="dashboard.html" onSubmit={onSubmit}>
        <TextFieldGroup
          placeholder="Email Addredss"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <TextFieldGroup
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          error={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <a href="register.html">Sign Up</a>
      </p>
    </section>
  );
}

export default Login;
