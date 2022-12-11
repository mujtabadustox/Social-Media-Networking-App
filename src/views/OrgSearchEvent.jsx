import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { uploadEvent } from "../api/event";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// design
import { TextField, InputLabel } from "@mui/material";

var searchedPosts = [];
var filteredEvents = [];

function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i]._id;
    //console.log("agh:", item, seen[item]);
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = a[i];
    }
  }
  return out;
}

const OrgSearchEvents = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const { user, setUser } = useContext(UserContext);

  const [tabIndex, setTabIndex] = useState(0);

  const handleEvent = async (e) => {
    setTabIndex(0);
    searchedPosts = [];
    filteredEvents = [];

    if (location) {
      console.log("LOC", location);
      const response = await axios.get(
        `http://localhost:8080/getOneEventLoc/${location}`
      );

      response.data.data.map((item, index) => {
        if (location == item.location) {
          searchedPosts.push(item);
        }
      });
    }

    if (type) {
      console.log("ASdas:", type);
      const response2 = await axios.get(
        `http://localhost:8080/getOneEventTp/${type}`
      );

      response2.data.data.map((item, index) => {
        if (type == item.type) {
          searchedPosts.push(item);
        }
      });
    }

    searchedPosts = uniq_fast(searchedPosts);

    searchedPosts.map((item, index) => {
      if (type == item.type && location == item.location) {
        filteredEvents.push(item);
      }
    });

    setTabIndex(1);
  };

  const onInterested = async (e) => {
    console.log("USSS", user);
    console.log("FOL", e.target.id);
    const response = await axios.get(
      `http://localhost:8080/followEvents/${user}/${e.target.id}`
    );
    console.log(response.data);
    //window.location.reload();
  };

  return (
    <div>
      SearchEvents
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2">
          Search Events
        </label>
      </div>
      <div>
        <div className="form-group">
          <InputLabel>Select Event Type</InputLabel>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Public Talks">Public Talks</option>
            <option value="Motivational Talks">Motivational Talks</option>
            <option value="Professional Talk">Professional Talk</option>
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
        <div className="text-center mt-4">
          <Button variant="contained" onClick={handleEvent}>
            Search
          </Button>
        </div>
      </div>
      {tabIndex === 1 && (
        <div>
          {filteredEvents.map((item, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "300px",
                width: "50%",
              }}
            >
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "500px",
                }}
              >
                <Card.Header>
                  <strong>{item.eventname}</strong>
                </Card.Header>
                <div>
                  <Image
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100px",
                      height: "100px",
                    }}
                    src={item.photoSrc}
                    roundedCircle
                  />
                </div>
                <Card.Body
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card.Title
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Type
                  </Card.Title>
                  <Card.Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.type}
                  </Card.Text>
                  <Card.Title
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Location
                  </Card.Title>
                  <Card.Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.location}
                  </Card.Text>
                </Card.Body>
                <Button
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  variant="primary"
                  id={item?.eventname}
                  onClick={onInterested}
                >
                  Interested
                </Button>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgSearchEvents;
