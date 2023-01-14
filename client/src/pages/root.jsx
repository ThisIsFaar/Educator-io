import { Outlet, Link } from 'react-router-dom';
import './root.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
export default function Root() {
  return (
    <div className="main-container">
      <div className="root-main">
        <div className=" text-7xl md:text-9xl ">EDUCATOR.IO</div>
        <Link to="/login">  
          <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Get Started</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
