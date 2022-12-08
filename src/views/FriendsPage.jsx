import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

var allusers = [];

const FriendsPage = () => {
  const [data, setData] = useState({});

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

  return (
    <div>
      Friends Page
      {console.log(allusers)}
      <div>
        {allusers.map((item, index) => (
          <div className="card">
            <p>{item.username}</p>
            <p>{item.profession}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
