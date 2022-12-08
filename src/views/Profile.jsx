import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "../UserContext";

import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

// functions
import { logout } from "../api/user";
import { getUser } from "../api/user";

const Profile = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const abc = getUser();

  const [data, setData] = useState({});

  useEffect(() => {
    const getOneUser = async () => {
      const response = await axios.get(
        `http://localhost:8080/sendUser/${user}`
      );
      setData(response.data.data);
      console.log("aaa", response.data.data);
    };
    getOneUser();
  }, []);

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
          <Link className="btn btn-dark" to="/">
            Home
          </Link>
        )}
        {user && (
          <Link className="btn btn-dark" to="/friendspage">
            Find Friends
          </Link>
        )}
      </div>
    </div>
  );
};

export default Profile;
