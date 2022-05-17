import React from "react";
import "./sidebarStyle.css";
import "../../normalize.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faIdBadge,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

export default function sidebar() {
  return (
    <div class="sidebar" id="sideBar">
      <img src="" class="logo" />
      <h2 class="logo--text">Logo</h2>
      <ul class="sidebar--list">
        <li class="options">
          <FontAwesomeIcon icon={faUsers} color="#a4a6b3" size="1.5x" />
          <span class="list--text">Teachers Records</span>
        </li>
        <li class="options">
          <FontAwesomeIcon icon={faIdBadge} color="#a4a6b3" size="1.5x" />
          <span class="list--text">Verify Teacher</span>
        </li>
        <li class="options">
          <FontAwesomeIcon icon={faCalendarCheck} color="#a4a6b3" size="1.5x" />
          <span class="list--text">Update Requests</span>
        </li>
      </ul>
      {/*<div class="footer--sidebar">
          <button type="submit" class="btn--close" id="closeBtn">
            <img src="images/cross.svg" class="btn--svg" />
            <p class="btn--text">Close</p>
          </button>
  </div>*/}
    </div>
  );
}
