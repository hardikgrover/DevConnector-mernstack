import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

function Navbar() {
  const dispatch = useDispatch();
  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(clearCurrentProfile());

    dispatch(logoutUser());
  };
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={onLogoutClick}>
          <img
            src={user.avatar}
            alt={user.name}
            title="you must have a gravatar connected to you email to display image"
            style={{ width: "25px", marginRight: "5px" }}
            className="rounded-circle"
          ></img>
          Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          DevConnector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                {" "}
                Developers
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
