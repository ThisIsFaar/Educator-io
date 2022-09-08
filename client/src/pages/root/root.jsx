import { Outlet, Link } from 'react-router-dom';
import './root.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
export default function Root() {
  return (
    <div className="main-container">
      <div className="root-main">
        <div className="root-main__heading">EDUCATOR.IO</div>
        <div className="root-main__info">
          A Platform For Managing Teacher's Data
        </div>
        <Link to="/login">
          <button className="root-main__btn">
            Get Started &nbsp; <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
