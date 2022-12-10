import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { UserContext } from "../UserContext";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

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
      const response = await axios.get(`http://localhost:8080/send`);
      response.data.data.map((item) => {
        if (user) {
          if (item.username !== user) {
            //console.log(user);
            allusers.push(item);
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
      Friends Page
      {console.log("XYZ", allusers)}
      <div>
        {allusers.map((item, index) => (
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
                  {item.hobl}
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
