import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

function Dashboard() {
  const { profile, loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);
  const onDelete = () => {
    dispatch(deleteAccount());
  };

  const { user } = useSelector((state) => state.auth);
  console.log(profile, loading);

  let dashboardContent;

  if (profile == null || loading) {
    dashboardContent = <Spinner></Spinner>;
  } else {
    //   check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-mutated">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <div style={{ marginBottom: "60px" }} />
          <button onClick={onDelete} className="btn btn-danger">
            Delete my account
          </button>
        </div>
      );
    } else {
      // user is logged in but has no profile
      dashboardContent = (
        <div>
          <p className="lead text-mutated">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="dispalay-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
