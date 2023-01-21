import logo from '../assets/images/logo.png';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../api/index';
import { toastObjDetails } from '../utils/data';
import { toast } from 'react-toastify';

function Navbar() {
  let navigate = useNavigate();

  return (
    <nav className="bg-primary border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className='flex items-center'>
          <img src={logo} className="h-9" alt="Educator.io Logo" />
        </Link>
        {isAuthenticated() && (
          <button
            onClick={() => {
              logout();
              toast.info('Successully Signout', toastObjDetails);
              navigate('/login/');
            }}
            className="block py-2 pl-3 rounded pr-4 text-white bg-secondary roundeddark:text-white"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faSignOut}
              color="#224957"
              size="2x"
            />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
