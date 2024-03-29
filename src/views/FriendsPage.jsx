import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { UserContext } from "../UserContext";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import "./Styles/Profile.css";

var allusers = [];

const FriendsPage = () => {
  const [data, setData] = useState({});
  const { user, setUser } = useContext(UserContext);

  function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
      var item = a[i].username;
      console.log("agh:", item, seen[item]);
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = a[i];
      }
    }
    return out;
  }

  useEffect(() => {
    const getOneUser = async () => {
      console.log("user:", user);
      const response1 = await axios.get(
        `http://localhost:8080/sendUser/${user}`
      );
      console.log("aaa", response1.data.data);

      const response = await axios.get(`http://localhost:8080/send`);
      response.data.data.map((item) => {
        if (user) {
          if (item.username !== user) {
            if (response1.data.data.friends.length > 0) {
              response1.data.data.friends.map((frnds) => {
                if (frnds !== item.username) {
                  console.log("frnd:", frnds);
                  console.log("item:", item.username);
                  allusers.push(item);
                }
              });

              //console.log(user);
              //allusers.push(item);
            } else {
              allusers.push(item);
            }
          }
        }
      });
      setData(response.data.data);
      //console.log("aaa", response.data.data);
    };
    getOneUser();
  }, []);

  allusers = uniq_fast(allusers);

  const onLike = async (e) => {
    console.log("USSS", user);
    console.log("FOL", e.target.id);
    const response = await axios.get(
      `http://localhost:8080/addFriends/${user}/${e.target.id}`
    );
    console.log(response.data);
    //window.location.reload();
  };

  return (
    <div>
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2">
          Meet Friends
        </label>
      </div>
      {console.log("XYZ", allusers)}
      <div className="abc">
        {allusers.map((item, index) => (
          <div
            className="my-info"
            style={{
              display: "inline-block",
              alignItems: "center",
              justifyContent: "center",
              leftPadding: "200px",
              width: "50%",
            }}
          >
            <Card
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "500px",
              }}
            >
              <Card.Header>
                <strong>{item.username}</strong>
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
                  src={item.displaypicture}
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
                  Profession
                </Card.Title>
                <Card.Text
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.profession}
                </Card.Text>
                <Card.Title
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Hobbies
                </Card.Title>
                <Card.Text
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.hobl && item.hobl.map((item, index) => <h6>{item}</h6>)}
                </Card.Text>
              </Card.Body>
              <Button
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="primary"
                id={item?.username}
                onClick={onLike}
              >
                Add Friend
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
