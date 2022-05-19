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
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import logo from "../../common/images/Logo.png";
import UpdateRequestForm from "./UpdateRequestForm";

export default function UserDashboard() {
  const [page, setpage] = useState("Application");
  return (
    <div className="container">
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
