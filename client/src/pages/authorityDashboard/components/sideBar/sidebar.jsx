import React from 'react';
// import './sidebarStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faUsers,
  faIdBadge,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';

export default function sidebar() {
  return (
    <div className="sidebar" id="sideBar">
      <img src="" className="logo" />
      <h2 className="logo--text">Logo</h2>
      <ul className="sidebar--list">
        <li className="options">
          <FontAwesomeIcon icon={faUsers} color="#a4a6b3" size="1.5x" />
          <span className="list--text">Teachers Records</span>
        </li>
        <li className="options">
          <FontAwesomeIcon icon={faIdBadge} color="#a4a6b3" size="1.5x" />
          <span className="list--text">Verify Teacher</span>
        </li>
        <li className="options">
          <FontAwesomeIcon icon={faCalendarCheck} color="#a4a6b3" size="1.5x" />
          <span className="list--text">Update Requests</span>
        </li>
      </ul>
      {/*<div className="footer--sidebar">
          <button type="submit" className="btn--close" id="closeBtn">
            <img src="images/cross.svg" className="btn--svg" />
            <p className="btn--text">Close</p>
          </button>
  </div>*/}
    </div>
  );
}
