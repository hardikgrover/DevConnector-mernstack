import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

function Dashboard() {
  const { profile, loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  const { user } = useSelector((state) => state.auth);
  console.log(profile, loading);

  let dashboardContent;

  if (profile == null || loading) {
    dashboardContent = <Spinner></Spinner>;
  } else {
    dashboardContent = <h1> hello</h1>;
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
