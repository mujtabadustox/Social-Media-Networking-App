import React, { useContext } from "react";

import { UserContext } from "../UserContext";

const Homepage = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="container text-center" style={{ marginTop: "12rem" }}>
      <div className="alert alert-primary p-5">
        <h1>
          {user && <span className="text-success">{user}'s</span>} Homepage
        </h1>
      </div>
    </div>
  );
};

export default Homepage;
