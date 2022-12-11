import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { UserContext } from "../UserContext";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

var allEvents = [];
var allTypeEvents = [];

const OrgEventsType = () => {
  const [data, setData] = useState({});
  const { user, setUser } = useContext(UserContext);

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
      console.log("user:", user);
      const response3 = await axios.get(
        `http://localhost:8080/sendOrg/${user}`
      );

      setData(response3.data.data);

      //console.log("length:", data.hobl.length);

      const response = await axios.get(`http://localhost:8080/getEvents`);

      response.data.data.map((item) => allEvents.push(item));

      //console.log("aaa", response.data.data);
    };
    getEvents();
  }, []);

  let length = data?.hobl?.length;
  allEvents.map((item, index) => {
    for (let i = 0; i < length; i++) {
      if (data.hobl[i] == item?.type) {
        allTypeEvents.push(item);
      }
    }
  });
  allTypeEvents = uniq_fast(allTypeEvents);

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
      Events Page
      {console.log("XYZ", allTypeEvents)}
      <div>
        {allTypeEvents.map((item, index) => (
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
    </div>
  );
};

export default OrgEventsType;
