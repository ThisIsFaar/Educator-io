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
  faIdBadge,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

export default function UserDashboard() {
  const [page, setpage] = useState("Records");
  return (
    <div className="container">
      <div className="sidebar">
        <div class="sidebar" id="sideBar">
          <img src="images/logo.svg" class="logo" />
          <h2 class="logo--text">Logo</h2>
          <ul class="sidebar--list">
            <li
              class={page === "Records" ? "options active" : " options"}
              onClick={() => setpage("Records")}
              style={{}}
            >
              <FontAwesomeIcon icon={faUsers} color="#a4a6b3" size="1.5x" />
              <span class="list--text">Teachers Records</span>
            </li>
            <li
              class={page === "Verify" ? "options active" : " options"}
              onClick={() => setpage("Verify")}
            >
              <FontAwesomeIcon icon={faIdBadge} color="#a4a6b3" size="1.5x" />
              <span class="list--text">Verify Teacher</span>
            </li>
            <li
              class={page === "Update" ? "options active" : " options"}
              onClick={() => setpage("Update")}
            >
              <FontAwesomeIcon
                icon={faCalendarCheck}
                color="#a4a6b3"
                size="1.5x"
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
