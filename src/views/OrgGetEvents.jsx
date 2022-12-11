import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { UserContext } from "../UserContext";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import { TextField, InputLabel } from "@mui/material";

var allEvents = [];

const OrgGetEvents = () => {
  const [data, setData] = useState({});
  const [info, setInfo] = useState({});
  const { user, setUser } = useContext(UserContext);
  const [invitedOrg, setInvitedOrg] = useState("");

  function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
      var item = a[i]._id;
      console.log("agh:", item, seen[item]);
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = a[i];
      }
    }
    return out;
  }

  useEffect(() => {
    const getEvents = async () => {
      const response3 = await axios.get(
        `http://localhost:8080/sendOrg/${user}`
      );
      setInfo(response3.data.data);

      const response = await axios.get(`http://localhost:8080/getEvents`);
      response.data.data.map((item) => {
        if (item) {
          //console.log(user);
          allEvents.push(item);
        }
      });
      setData(response.data.data);
      //console.log("aaa", response.data.data);
    };
    getEvents();
  }, []);

  allEvents = uniq_fast(allEvents);

  const onInterested = async (e) => {
    console.log("USSS", user);
    console.log("FOL", e.target.id);
    const response = await axios.get(
      `http://localhost:8080/followEvents/${user}/${e.target.id}`
    );
    console.log(response.data);
    //window.location.reload();
  };

  const onInvited = async (e) => {
    console.log("USSS", user);
    console.log("USSS1", invitedOrg);
    console.log("FOL", e.target.id);
    const response = await axios.get(
      `http://localhost:8080/sendInvite/${invitedOrg}/${e.target.id}`
    );
    console.log(response.data);
    //window.location.reload();
  };

  return (
    <div>
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2">
          Events
        </label>
      </div>
      Events Page
      {console.log("XYZ", allEvents)}
      <div>
        {allEvents.map((item, index) => (
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
              <Button
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="primary"
                id={item?.eventname}
                onClick={onInvited}
              >
                Invite
              </Button>

              <div className="form-group">
                <InputLabel>
                  <strong>Invite Other Organizations</strong>
                </InputLabel>
                <select
                  value={invitedOrg}
                  onChange={(e) => setInvitedOrg(e.target.value)}
                >
                  {info.following &&
                    info.following.map((item, index) => (
                      <option value={item}>{item}</option>
                    ))}
                  <option value={""}>select Organization</option>
                </select>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgGetEvents;
