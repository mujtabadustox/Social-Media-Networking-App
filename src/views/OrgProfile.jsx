import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "../UserContext";

import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

// functions
import { logoutOrg } from "../api/organization";

const OrgProfile = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const [data, setData] = useState({});

  useEffect(() => {
    const getOneUser = async () => {
      const response = await axios.get(`http://localhost:8080/sendOrg/${user}`);
      setData(response.data.data);
      console.log("aaa", response.data.data);
    };
    getOneUser();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await logoutOrg();
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        setUser(null);
        // redirect the user to home
        history.replace("orglogin");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="container text-center">
      <div className="my-navbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item active">
                <Link className="nav-link" to="/orgprofile">
                  Profile
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/orgfriendspage">
                  Find Organizations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orgshowevents">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-dark" to="/orgeventstypes">
                  Show Events (By Hobbies)
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orgsearchevents">
                  Search Event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orgcreateevent">
                  Create an Event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/followings">
                  Followings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orgcontent">
                  Oragnizations' Posts
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="alert alert-light p-1">
        <h1>
          {user && (
            <span className="text-success">
              {/* data.friends is an array */}
              Welcome {user}!!! Profession: {data.profession} aaa friends:
              {data.friends}
              <div>
                <img id="img" src={data.displaypicture} />
              </div>
            </span>
          )}{" "}
        </h1>
      </div>
      <div className="bottom">
        <button className="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>
        {user && (
          <Link className="btn btn-dark" to="/orghome">
            Home
          </Link>
        )}
        {user && (
          <Link className="btn btn-dark" to="/orgfriendspage">
            Find Friends
          </Link>
        )}
      </div>
    </div>
  );
};

export default OrgProfile;
