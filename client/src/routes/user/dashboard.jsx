import Application from "./Application";
import Profile from "./Profile";
import UpdateRequest from "./Updaterequest";
import { useState } from "react";
import "../authority/dashboardStyle.css";
import "../../normalize.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faIdBadge,
  faCalendarCheck,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import logo from "../../common/images/Logo.png";
import { logout } from "../../auth/helper";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  let navigate = useNavigate();

  const [page, setpage] = useState("Application");
  return (
    <div className="container">
      <button
        onClick={() => {
          logout();
          navigate("/login/?status=signout");
        }}
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          right: "1rem",
          top: "1rem",
          padding: "2rem",
          borderRadius: "1rem",
          backgroundColor: "#224957",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon
          className="icons"
          icon={faSignOut}
          color="white"
          size="2x"
        />
      </button>
      <div className="sidebar">
        <div className="sidebar" id="sideBar">
          <div className="Logo">
            <img src={logo} className="logo" />
          </div>
          <ul className="sidebar--list">
            <li
              class={page === "Application" ? "options active" : " options"}
              onClick={() => setpage("Application")}
              style={{}}
            >
              <FontAwesomeIcon
                className="icons"
                icon={faUsers}
                color="#a4a6b3"
                size="2x"
              />
              <span className="list--text">Application</span>
            </li>
            <li
              class={page === "Profile" ? "options active" : " options"}
              onClick={() => setpage("Profile")}
            >
              <FontAwesomeIcon
                className="icons"
                icon={faIdBadge}
                color="#a4a6b3"
                size="2x"
              />
              <span className="list--text">User Profile</span>
            </li>
            <li
              class={page === "Updaterequest" ? "options active" : " options"}
              onClick={() => setpage("Updaterequest")}
            >
              <FontAwesomeIcon
                className="icons"
                icon={faCalendarCheck}
                color="#a4a6b3"
                size="2x"
              />
              <span className="list--text">Update Requests</span>
            </li>
            {/* <li
              class={page === "UpdateRequestForm" ? "options active" : " options"}
              onClick={() => setpage("UpdateRequestForm")}
            >
              <FontAwesomeIcon
                className="icons"
                icon={faCalendarCheck}
                color="#a4a6b3"
                size="2x"
              />
              <span className="list--text">Update Requests form</span>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="right">
        <div className="heading">User DashBoard</div>
        <div className="main">
          {page === "Application" && <Application />}
          {page === "Profile" && <Profile />}
          {page === "Updaterequest" && <UpdateRequest />}
          {/* {page === "UpdateRequestForm" && <UpdateRequestForm />} */}
        </div>
      </div>
    </div>
  );
}
