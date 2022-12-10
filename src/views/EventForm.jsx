import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { uploadEvent } from "../api/event";

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

import dp from "./img.png";

const EventForm = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState({});
  const [photoSrc, setPhotoSrc] = useState("");

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
            //value={}
            //onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Location"
            //value={}
            //onChange={(e) => setEmail(e.target.value)}
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
          <Button
            variant="contained"
            //onClick={handleRegister}
          >
            Submit
          </Button>
        </div>
      </div>
      ;
    </div>
  );
};

export default EventForm;
