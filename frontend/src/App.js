import "./App.css";
import { Navbar } from "./components/Navbar";
import { SideNavbar } from "./components/SideNavbar";
import SignUpForm from "./components/Signup";
import LoginForm from "./components/Login";

import OrgSignUpForm from "./components/OrgSignup";
import OrgLoginForm from "./components/OrgLogin";

import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import UserProfile from "./components/UserProfile";
import Invitations from "./components/invitations";
import { Link, Outlet } from "react-router-dom";
import Event from "./components/Event";
import LoginOrgProfile from "./components/LoginOrgProfile";
import EventsCommunity from "./components/EventsCommunity";

import { Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Landing from "./components/LandingPage/Landing";
import Profile from "./components/Profile";
import Organization from "./components/Organization";
import People from "./components/People";
import OrgProfile from "./components/OrgProfile";
import Veteran from "./components/Veteran";

import AddNewEvent from "./components/AddNewEvent/AddNewEvent";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />

        <Route exact path="/signup" element={<SignUpForm />} />
        <Route exact path="/login" element={<LoginForm />} />

        <Route exact path="/organization/signup" element={<OrgSignUpForm />} />
        <Route exact path="/organization/login" element={<OrgLoginForm />} />

        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/orgprofile" element={<OrgProfile />} />
        <Route exact path="/loginorgprofile" element={<LoginOrgProfile />} />
        <Route
          exact
          path="dashboard"
          element={
            <>
              <Navbar />
              <SideNavbar />
              <div className="outlet_container">
                <Outlet />
              </div>
            </>
          }
        >
          <Route exact path="" element={<Dashboard />} />
          <Route exact path="settings" element={<Profile />} />
          <Route exact path="organizations" element={<Organization />} />
          <Route exact path="people" element={<People />} />
          <Route
            exact
            path="events"
            element={
              localStorage.getItem("userType") === "community" ? <EventsCommunity /> : <Events />
            }
          />
          <Route exact path="invitations" element={<Invitations />} />
          <Route exact path="veteran" element={<Veteran />} />
          <Route exact path="community" element={<OrgProfile />} />

          <Route exact path="addnewevent" element={<AddNewEvent />} />

          <Route exact path="event" element={<Event />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
