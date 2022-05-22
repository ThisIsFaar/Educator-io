import { Outlet, Link } from "react-router-dom";
import "../src/landing.css";
import Logo from "../src/common/images/Logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
export default function App() {
  return (
    <div className="main-container">
      <div className="upper">
        <img src={Logo} alt="" />
      </div>
      <div className="lower">
        <div className="main-heading">EDUCATORS.IO</div>
        <div className="info">A Platform For Managing Teacher's Data</div>
        <button className="started">
          <a href="/login" style={{ textDecoration: "none", color: "white" }}>
            Get Started &nbsp; <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </button>
      </div>
      <Outlet />
    </div>
  );
}
