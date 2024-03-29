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
import FriendsPage from "./views/FriendsPage";
import Content from "./views/Content";
import EventForm from "./views/EventForm";
import Events from "./views/Events";
import EventsType from "./views/EventsType";
import SearchEvents from "./views/SearchEvents";
import OrgSignUp from "./views/OrgSignUp";
import LoginOrg from "./views/LoginOrg";
import OrgProfile from "./views/OrgProfile";
import OrgHome from "./views/OrgHome";
import OrgContent from "./views/OrgContent";
import OrgFollowing from "./views/OrgFollowing";
import OrgSearchEvent from "./views/OrgSearchEvent";
import OrgGetEvents from "./views/OrgGetEvents";
import OrgEventForm from "./views/OrgEventForm";
import OrgTypeEvents from "./views/OrgTypeEvents";
import Friends from "./views/Friends";
import Followings from "./views/Followings";

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
          <Route exact path="/friendspage" component={FriendsPage} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/content" component={Content} />
          <Route exact path="/createEvent" component={EventForm} />
          <Route exact path="/showevents" component={Events} />
          <Route exact path="/eventstypes" component={EventsType} />
          <Route exact path="/searchevents" component={SearchEvents} />
          <Route exact path="/orgsignup" component={OrgSignUp} />
          <Route exact path="/orglogin" component={LoginOrg} />
          <Route exact path="/orghome" component={OrgHome} />
          <Route exact path="/orgprofile" component={OrgProfile} />
          <Route exact path="/orgcontent" component={OrgContent} />
          <Route exact path="/orgfriendspage" component={OrgFollowing} />
          <Route exact path="/orgshowevents" component={OrgGetEvents} />
          <Route exact path="/orgsearchevents" component={OrgSearchEvent} />
          <Route exact path="/orgcreateevent" component={OrgEventForm} />
          <Route exact path="/followings" component={Followings} />
          <Route exact path="/orgeventstypes" component={OrgTypeEvents} />
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
