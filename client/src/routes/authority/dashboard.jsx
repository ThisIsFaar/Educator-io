import Sidebar from "./sidebar";
import "./dashboardStyle.css";
import "../../normalize.css";
import Records from "./Records";
import VerifyUser from "./VerifyUser";
import UpdateUser from "./UpdateUser";
import { useState } from "react";
import "./sidebarStyle.css";
import "../../normalize.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faSignOut,
  faIdBadge,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import logo from "../../common/images/Logo.png";
import { logout } from "../../auth/helper";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  let navigate = useNavigate();

  const [page, setpage] = useState("Records");
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
        <div class="sidebar" id="sideBar">
          <div className="Logo">
            <img src={logo} class="logo" />
          </div>
          <ul class="sidebar--list">
            <li
              class={page === "Records" ? "options active" : " options"}
              onClick={() => setpage("Records")}
              style={{}}
            >
              <FontAwesomeIcon
                className="icons"
                icon={faUsers}
                color="#a4a6b3"
                size="2x"
              />
              <span class="list--text">Teachers Records</span>
            </li>
            <li
              class={page === "Verify" ? "options active" : " options"}
              onClick={() => setpage("Verify")}
            >
              <FontAwesomeIcon
                className="icons"
                icon={faIdBadge}
                color="#a4a6b3"
                size="2x"
              />
              <span class="list--text">Verify Teacher</span>
            </li>
            <li
              class={page === "Update" ? "options active" : " options"}
              onClick={() => setpage("Update")}
            >
              <FontAwesomeIcon
                className="icons"
                icon={faCalendarCheck}
                color="#a4a6b3"
                size="2x"
              />
              <span class="list--text">Update Requests</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="right">
        <div className="heading">Admin DashBoard</div>
        <div className="main">
          {page === "Records" && <Records />}
          {page === "Verify" && <VerifyUser />}
          {page === "Update" && <UpdateUser />}
        </div>
      </div>
    </div>
  );
}
