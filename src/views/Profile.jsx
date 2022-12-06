import React, { useContext } from "react";

import { UserContext } from "../UserContext";

import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

// functions
import { logout } from "../api/user";

const Profile = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { profession, setProfession } = useContext(UserContext);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await logout();
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        setUser(null);
        // redirect the user to home
        history.replace("/");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="container text-center">
      <div className="alert alert-light p-1">
        <h1>
          {user && (
            <span className="text-success">
              Welcome {user}!! profession {profession}
            </span>
          )}{" "}
          Profile
        </h1>
      </div>
      <div className="bottom">
        <button className="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>
        {user && (
          <Link className="btn btn-dark" to="/">
            Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default Profile;
