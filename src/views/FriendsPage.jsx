import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { UserContext } from "../UserContext";

var allusers = [];

const FriendsPage = () => {
  const [data, setData] = useState({});
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getOneUser = async () => {
      const response = await axios.get(`http://localhost:8080/send`);
      response.data.data.map((item) => {
        allusers.push(item);
      });
      setData(response.data.data);
      console.log("aaa", response.data.data);
    };
    getOneUser();
  }, []);

  const onLike = async (e) => {
    console.log("USSS", user);
    console.log("FOL", e.target.id);
    const response = await axios.get(
      `http://localhost:8080/addFriends/${user}/${e.target.id}`
    );
    console.log(response.data);
    window.location.reload();
  };

  return (
    <div>
      Friends Page
      {console.log(allusers)}
      <div>
        {allusers.map((item, index) => (
          <div className="card">
            <p id="usrnm">{item.username}</p>
            <p>{item.profession}</p>
            <img id="img" src={item.displaypicture} />

            <button id={item?.username} onClick={onLike}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
