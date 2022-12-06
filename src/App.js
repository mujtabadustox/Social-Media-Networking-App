import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { UserContext } from "./UserContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUser } from "./api/user";

import Homepage from "./views/Homepage";
import Signup from "./views/Signup";
import Login from "./views/Login.jsx";
import Header from "./components/Header";
import Profile from "./views/Profile";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getUser()
      .then((res) => {
        if (res.error) toast(res.error);
        else setUser(res.username);
      })
      .catch((err) => toast(err));

    return () => unsubscribe;
  }, []);

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <ToastContainer />
          <Header />
          <Redirect to={user ? "/" : "login"} />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
