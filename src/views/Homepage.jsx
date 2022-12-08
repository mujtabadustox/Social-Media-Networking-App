import React, { useContext, useState, useEffect } from "react";

import axios from "axios";

import { UserContext } from "../UserContext";

import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

// functions
import { logout, getOneUser } from "../api/user";

import "./Styles/Home.css";

const Homepage = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const { user, setUser } = useContext(UserContext);

  const [profession, setProfession] = useState({});

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

  const handleProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await getOneUser(user);
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        //setData1(res.data);
        // redirect the user to home
        history.replace("/");
      }
    } catch (err) {
      toast.error(err);
    }
  };

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
          {user && <span className="text-success">Welcome {user}!!</span>} Have
          a Good Day! Profession: {data.profession}
        </h1>
      </div>
      <div className="bottom">
        <button className="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>
        {user && (
          <Link className="btn btn-dark" to="/profile">
            Profile
          </Link>
        )}
      </div>
    </div>
  );
};

export default Homepage;
