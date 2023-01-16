import { useState } from 'react';
import Records from './pages/records/Records';
import VerifyUser from './pages/verifyUser/VerifyUser';
import UpdateUser from './pages/updateUser/UpdateUser';
// import './authorityDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sideBarData } from './data';
// import './components/sideBar/sidebarStyle.css';
import {
  faBars, faXmark
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
export default function AuthorityDashboard() {
  const [page, setpage] = useState('Teachers Records');
  const [menuToggle, SetMenuToggle] = useState(false);
  return (
    <div className="flex flex-no-wrap">
      {/* Sidebar starts */}
      {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
      <div className="w-64 absolute sm:relative bg-slate-900 shadow md:h-screen flex-col justify-between hidden sm:flex">
        <div className="px-8">

          <ul className="mt-12">
            {sideBarData.map((item, key) => {
              return (
                <li
                  key={key}
                  class="flex w-full justify-between text-secondary hover:text-white cursor-pointer items-center mb-6"
                  onClick={() => setpage(item.title)}
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon
                      className="icon icon-tabler icon-tabler-compass"
                      icon={item.icon}
                    // color="#a4a6b3"
                    // size="2x"
                    />
                    <span className="text-sm uppercase text-center font-semibold ml-2">{item.title}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={classNames("w-64 h-screen z-40 absolute bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out", {
        "translate-x-[0px]": menuToggle
      },
        {
          "translate-x-[-260px]": !menuToggle
        }

      )} id="mobile-nav">
        <div className="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br text-secondary justify-center cursor-pointer" id="mobile-toggler"
          onClick={() => SetMenuToggle(!menuToggle)}>

          {
            menuToggle ?
              <FontAwesomeIcon icon={faXmark} />
              :
              <FontAwesomeIcon icon={faBars} />
          }
        </div>
        <div className="px-8">
          <ul className="mt-12">
            {sideBarData.map((item, key) => {
              return (
                <li
                  key={key}
                  class="flex w-full justify-between text-secondary hover:text-white cursor-pointer items-center mb-6"
                  onClick={() => { setpage(item.title); SetMenuToggle(!menuToggle) }}
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon
                      className="icon icon-tabler icon-tabler-compass"
                      icon={item.icon}
                    // color="#a4a6b3"
                    // size="2x"
                    />
                    <span className="text-sm uppercase text-center font-semibold ml-2">{item.title}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Sidebar ends */}
      {/* Remove class [ h-64 ] when adding a card block */}
      <div className="container mx-auto py-10 md:w-4/5 w-11/12 px-6 h-screen">
        {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
        <div className="w-full h-full rounded border-dashed border-2 border-gray-300">{/* Place your content here */}
        {page === 'Teachers Records' && <Records />}
           {page === 'Verify Teacher' && <VerifyUser />}
           {page === 'Update Request' && <UpdateUser />}
        </div>
      </div>
    </div>
  );
}
