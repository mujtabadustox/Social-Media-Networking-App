import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "../UserContext";

import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

// functions
import { logout } from "../api/user";
import { getUser } from "../api/user";

import "./Styles/Profile.css";

const Profile = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const abc = getUser();

  const [data, setData] = useState({});

  const [allPosts, setallPosts] = useState([]);

  var psts = [];

  useEffect(() => {
    const getOneUser = async () => {
      console.log("user:", user);
      const response = await axios.get(
        `http://localhost:8080/sendUser/${user}`
      );
      setData(response.data.data);
      console.log("aaa", response.data.data);

      const response3 = await axios.get(
        `http://localhost:8080/getOnePost/${user}`
      );
      response3.data.data.map((item, index) => {
        psts.push(item);
      });
      console.log("psts:", psts);
      setallPosts(psts);
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

  function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
      var item = a[i]._id;
      console.log("agh:a", item, seen[item]);
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = a[i];
      }
    }
    return out;
  }

  psts = uniq_fast(psts);
  console.log("allp:", psts);

  return (
    <div className="container">
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
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/friendspage">
                  Find Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showevents">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-dark" to="/eventstypes">
                  Show Events (By Hobbies)
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/searchevents">
                  Search Event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/createEvent">
                  Create an Event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/friends">
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/content">
                  Friends' Posts
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="my-container">
        <div className="my-profile">
          <h1>
            {user && (
              <span className="text-success">
                {/* data.friends is an array */}
                <h1>
                  <strong>Profile</strong>
                </h1>
                <div>
                  <img id="img" src={data.displaypicture} />
                </div>
                <div className="my-info">
                  <h2>Username: {user}</h2>
                  <h3>Profession: {data.profession}</h3>
                  <h3>Status: {data.status}</h3>
                  <h3>Stars: {data.points}</h3>
                  <h3>Hobbies:</h3>
                  {data.hobl && data.hobl.map((item, index) => <h4>{item}</h4>)}

                  {data.friends && data.friends.length > 0 && <h3>Friends:</h3>}

                  {data.friends &&
                    data.friends.map((item, index) => <h4>{item}</h4>)}
                </div>
              </span>
            )}{" "}
          </h1>
        </div>
        <div className="my-posts">
          {allPosts && allPosts.length > 0 && <h1>Your Posts</h1>}
          {allPosts &&
            allPosts.map((item) => (
              <div className="posts">
                <p>{item.description}</p>
                <div className="card">
                  <img
                    className="other-images"
                    src={item.photoSrc}
                    width="500"
                    height="200"
                    alt="show-img"
                    id="newImg"
                  ></img>
                </div>
              </div>
            ))}
        </div>
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
