import React, { useContext, useState, useEffect } from "react";

import axios from "axios";

import { UserContext } from "../UserContext";

import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

import "./Styles/Home.css";
import dp from "./img.png";

// design
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";

// functions
import { logout, getOneUser } from "../api/user";
import { posting } from "../api/post";

const Homepage = () => {
  const [photoSrc, setPhotoSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [reaction, setReaction] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();
  const [data, setData] = useState({});
  const { user, setUser } = useContext(UserContext);

  //////

  const handlePosting = async (e) => {
    e.preventDefault();

    console.log("Image");
    let username = user;

    try {
      const res = await posting({
        username,
        photoSrc,
        videoSrc,
        description,
      });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        // redirect the user to login
        history.replace("/content");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    document.getElementById("myImage").click();
  };

  const handleVideo = async (e) => {
    e.preventDefault();
    document.getElementById("myVideo").click();
  };

  const readFile = (event) => {
    event.preventDefault();

    var fileReader = new FileReader();

    fileReader.readAsDataURL(event.target.files[0]);

    fileReader.onload = function (e) {
      var newReadImage = new Image();
      newReadImage.src = e.target.result;

      newReadImage.onload = function () {
        document.getElementById("newImg").src = newReadImage.src;
        setPhotoSrc(newReadImage.src);
      };
    };
  };

  const readVideo = (event) => {
    const file = event.target.files[0];
    setVideoSrc(file);
  };

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

  return !user ? (
    <div>
      <h1>Home</h1>
    </div>
  ) : (
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
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h1">
          Homepage
        </label>
        <h1>Welcome {user} Make a Post</h1>
      </div>
      <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <div className="my-info">
          <h2>Post away your feelings!!!</h2>
          <h3>Enter Text</h3>
          <TextField
            size="big"
            variant="outlined"
            className="form-control"
            label="What are you feeling"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <h3>Post a Picture</h3>
        <div className="other-images">
          <img
            className="rounded"
            src={dp}
            width="500"
            height="200"
            alt="show-img"
            id="newImg"
          ></img>
        </div>
        <input type="file" id="myImage" onChange={readFile} />
        <input type="file" id="myVideo" onChange={readVideo} />

        <div className="text-center mt-4">
          <Button onClick={handleVideo}>Post a Video</Button>
          <Button onClick={handleImage}>Post a Picture</Button>
        </div>
        <Button variant="contained" onClick={handlePosting}>
          Submit
        </Button>
      </div>
      <Link className="btn btn-dark" to="/content">
        Show Friend Posts
      </Link>
      <Link className="btn btn-dark" to="/createEvent">
        Add an Event
      </Link>
      <Link className="btn btn-dark" to="/showevents">
        Show Events
      </Link>
      <Link className="btn btn-dark" to="/eventstypes">
        Show Events (By Hobbies)
      </Link>
      <Link className="btn btn-dark" to="/searchevents">
        Search Events
      </Link>
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
