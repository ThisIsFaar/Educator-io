import Application from './Application';
import Profile from './Profile';
import UpdateRequest from './Updaterequest';
import { useState } from 'react';
import '../authority/dashboardStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faIdBadge,
  faCalendarCheck,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import { logout } from '../../auth/helper';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  let navigate = useNavigate();

  const [page, setpage] = useState('Application');
  return (
    <div className="mainContainer bg-secondary">
      <div className="sidebar">
        <div className="sidebar" id="sideBar">
          <ul className="sidebar--list">
            <li
              class={page === 'Application' ? 'options active' : ' options'}
              onClick={() => setpage('Application')}
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
              class={page === 'Profile' ? 'options active' : ' options'}
              onClick={() => setpage('Profile')}
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
              class={page === 'Updaterequest' ? 'options active' : ' options'}
              onClick={() => setpage('Updaterequest')}
            >
              <FontAwesomeIcon
                className="icons"
                icon={faCalendarCheck}
                color="#a4a6b3"
                size="2x"
              />
              <span className="list--text">Update Requests</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="right">
        <div className="heading">User DashBoard</div>
        <div className="main">
          {page === 'Application' && <Application />}
          {page === 'Profile' && <Profile />}
          {page === 'Updaterequest' && <UpdateRequest />}
        </div>
      </div>
    </div>
  );
}
