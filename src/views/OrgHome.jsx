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
import { logoutOrg } from "../api/organization";
import { posting } from "../api/post";

const OrgHome = () => {
  const [photoSrc, setPhotoSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [reaction, setReaction] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();
  const [data, setData] = useState({});
  const { user, setUser } = useContext(UserContext);
  const organization = user;

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
        history.replace("/orghome");
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
        <h1>{user && <span className="text-success">Salam {user}!!</span>}</h1>
      </div>
      <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <div className="card">
          <TextField
            size="big"
            variant="outlined"
            className="form-control"
            label="What are you feeling"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <img
            className="rounded"
            src={dp}
            width="500"
            height="200"
            alt="show-img"
            id="newImg"
          ></img>
          <input type="file" id="myImage" onChange={readFile} />
          <input type="file" id="myVideo" onChange={readVideo} />
        </div>
        <div className="text-center mt-4">
          <Button variant="contained" onClick={handleVideo}>
            Post a Video
          </Button>
          <Button
            // variant="contained"
            // disabled=
            // }
            onClick={handleImage}
          >
            Post a Picture
          </Button>
        </div>
        <Button variant="contained" onClick={handlePosting}>
          Submit
        </Button>
      </div>
      <Link className="btn btn-dark" to="/orgcontent">
        Show Friend Posts
      </Link>
      <Link className="btn btn-dark" to="/orgcreateevent">
        Add an Event
      </Link>
      <Link className="btn btn-dark" to="/orgshowevents">
        Show Events
      </Link>
      <Link className="btn btn-dark" to="/orgeventstypes">
        Show Events (By Hobbies)
      </Link>
      <Link className="btn btn-dark" to="/orgsearchevents">
        Search Events
      </Link>
      <div className="bottom">
        <button className="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>
        {user && (
          <Link className="btn btn-dark" to="/orgprofile">
            Profile
          </Link>
        )}
      </div>
    </div>
  );
};

export default OrgHome;
