import { useState } from 'react';
import Records from './pages/records/Records';
import VerifyUser from './pages/verifyUser/VerifyUser';
import UpdateUser from './pages/updateUser/UpdateUser';
// import './authorityDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sideBarData } from './data';
import './components/sideBar/sidebarStyle.css';
export default function AuthorityDashboard() {
  const [page, setpage] = useState('Teachers Records');
  return (
    <div className="container">
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
        <div className="heading">Admin DashBoard</div>
        <div className="main">
          {page === 'Teachers Records' && <Records />}
          {page === 'Verify Teacher' && <VerifyUser />}
          {page === 'Update Request' && <UpdateUser />}
        </div>
      </div>
    </div>
  );
}
