import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { uploadEvent } from "../api/event";

// design
import { TextField, InputLabel, Button } from "@mui/material";

import dp from "./img.png";

const EventForm = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState({});
  const [photoSrc, setPhotoSrc] = useState("");
  const [eventname, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, onChangeStartDate] = useState(new Date());
  const [endDate, onChangeEndDate] = useState(new Date());
  const [type, setType] = useState("");

  const handleEvent = async (e) => {
    e.preventDefault();

    console.log("AAAAAAAAAAAAA222222222222222");

    let username = user;
    let datePosted = new Date();

    try {
      const res = await uploadEvent({
        username,
        eventname,
        photoSrc,
        datePosted,
        startDate,
        endDate,
        description,
        type,
        location,
      });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        // redirect the user to login
        history.replace("/");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    document.getElementById("myImage").click();
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

  return (
    <div>
      <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <div className="text-center mb-5 alert alert-primary">
          <label htmlFor="" className="h2">
            Create An Event
          </label>
        </div>

        <div className="form-group">
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Event Name"
            value={eventname}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            size="large"
            variant="outlined"
            className="form-control"
            label="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <InputLabel>Start Date</InputLabel>
          <DatePicker onChange={onChangeStartDate} value={startDate} />
        </div>
        <div className="form-group">
          <InputLabel>End Date</InputLabel>
          <DatePicker onChange={onChangeEndDate} value={endDate} />
        </div>
        <div className="form-group">
          <InputLabel>Select Event Type</InputLabel>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Public Talks">Public Talks</option>
            <option value="Motivational Talks">Motivational Talks</option>
            <option value="Professional Talks">Professional Talk</option>
            <option value="Professional Task">Professional Task</option>
            <option value="Plantation Drives">Plantation Drives</option>
            <option value="Orphanage Visit">Orphanage Visit</option>
            <option value="Hospital Visit">Hospital Visit</option>
            <option value="Recreational Visit">Recreational Visit</option>
            <option value="Old Home Visit">Old Home Visit</option>
            <option value="Book Reading">Book Reading</option>
          </select>
        </div>
        <div className="form-group">
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-control">
          <img
            className="rounded"
            src={dp}
            width="500"
            height="200"
            alt="show-img"
            id="newImg"
          ></img>
          <div>
            <input type="file" id="myImage" onChange={readFile} />
          </div>
          <Button onClick={handleImage}>Add Image</Button>
        </div>

        <div className="text-center mt-4">
          <Button variant="contained" onClick={handleEvent}>
            Submit
          </Button>
        </div>
      </div>
      ;
    </div>
  );
};

export default EventForm;
