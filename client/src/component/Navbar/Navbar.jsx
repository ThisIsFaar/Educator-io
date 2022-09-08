import logo from './logo.png';
import './navbar.css';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../../api/index';

function Navbar() {
  let navigate = useNavigate();

  return (
    <div className="root-nav">
      <img src={logo} width={150} />
      {isAuthenticated() && (
        <button
          onClick={() => {
            logout();
            navigate('/login/?status=signout');
          }}
        >
          <FontAwesomeIcon
            className="icons"
            icon={faSignOut}
            color="white"
            size="2x"
          />
        </button>
      )}
    </div>
  );
}

export default Navbar;
