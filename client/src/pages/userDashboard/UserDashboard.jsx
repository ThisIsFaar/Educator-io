import { useState } from 'react';
// import './userDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sideBarData } from './data';
import Application from './pages/Application';
import Profile from './pages//Profile';
import UpdateRequest from './pages/Updaterequest';

export default function UserDashboard() {
  const [page, setpage] = useState('Application');

  return (
    <div className="mainContainer bg-secondary">
      <div className="sidebar">
        <ul className="sidebar--list">
          {sideBarData.map((item, key) => {
            return (
              <li
                key={key}
                class={page === item.title ? 'options active' : ' options'}
                onClick={() => setpage(item.title)}
              >
                <FontAwesomeIcon
                  className="icons"
                  icon={item.icon}
                  color="#a4a6b3"
                  size="2x"
                />
                <span className="list--text">{item.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="right">
        {page === 'Application' && <Application />}
        {page === 'User Profile' && <Profile />}
        {page === 'Update Request' && <UpdateRequest />}
      </div>
    </div>
  );
}
