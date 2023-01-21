import React, { useEffect, useState } from "react";
import ImageHelper from "../../../../component/ImageHelper";
import RecordsModal from "../../components/modal/recordModal/recordsModal";
import { recordsA } from "../../helper";

export default function Records() {
  const [users, setusers] = useState([]);
  const [modal, setmodal] = useState(false);
  const [muser, setmusers] = useState({});
  const [search, setsearch] = useState("");
  const keys = ["Name", "email", "postedDesignationName"];

  const loadAllRecords = () => {
    recordsA().then((data) => {
      if (data.error) {
      } else {
        setusers(data);
      }
    });
  };

  useEffect(() => {
    loadAllRecords();
  }, []);
  return (
    <div className="right--outer--layer w-full h-full overflow-auto p-4">
      <div className="container--box w-full h-full">
        {/* <div className="upper--bar">
          <span className="upper--bar--title">Teacher's Records</span>
          <span className="search--box">
            <input
              type="text"
              className="upper--bar--searchBox"
              placeholder="Search by Name,email,Post"
              onChange={(event) => {
                setsearch(event.target.value);
              }}
            />
          </span>
        </div> */}
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Name, Email, Post..." onChange={(event) => {
            setsearch(event.target.value);
          }} />
        </div>

        {/* <div className="filter--box--layerTwo ">
          <div className="filter--box" id="filter--box">
            <div className="filterbox--innerLayer">
              <input
                type="text"
                className="field fld--one"
                placeholder="Search by name here.."
              />
              <select className="field fld--two" id="Customer">
                <option selected>Designation</option>
                <option value="1">HTML</option>
                <option value="2">CSS</option>
                <option value="3">JavaScript</option>
              </select>
              <label for="joiningDAte" className="filter--label labelOne">
                Joining date
              </label>
              <input
                type="date"
                className="field fld--three"
                id="joiningDAte"
              />
              <label for="FilterDob" className="filter--label labelTwo">
                DOB
              </label>
              <input type="date" className="field fld--four" id="FilterDob" />
            </div>

            <div className="filterbox--innerLayerTwo">
              <input
                type="Text"
                className="field fld--five"
                id="FilterSchool"
                placeholder="Search by school here.."
              />
              <label for="FilterRetrYear" className="filter--label labelThree">
                Retirement year
              </label>
              <input
                type="date"
                className="field fld--six"
                id="FilterRetrYear"
              />
              <button className="fields--btn" type="submit">
                Apply
              </button>
            </div>
          </div>
        </div> */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4 my-4 rounded-xl">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="px-6 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Post
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  keys.some((key) => user[key].toLowerCase().includes(search))
                )
                .map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <ImageHelper user={user} />
                    </th>
                    <td className="px-6 py-4">{user.Name}</td>
                    <td className="px-6 py-4">{user.postedDesignationName}</td>
                    <td className="px-6 py-4">{user.gender}</td>
                    <td className="px-6 py-4">{user.phoneNumber}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          setmodal(true);
                          setmusers(user);
                        }}
                      >
                        Detail and Verify
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <RecordsModal
          onClose={() => setmodal(false)}
          user={muser}
          modal={modal}
          setmodal={setmodal}
        />
      </div>
    </div>
  );
}
