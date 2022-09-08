import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './records.css';
import ImageHelper from '../../../../api/ImageHelper';
import RecordsModal from '../../components/modal/recordModal/recordsModal';
import { recordsA } from '../../helper';

export default function Records() {
  const [users, setusers] = useState([]);
  const [modal, setmodal] = useState(false);
  const [muser, setmusers] = useState({});
  const [search, setsearch] = useState('');
  const keys = ['Name', 'email', 'postedDesignationName'];

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
    <div>
      <div className="right--outer--layer">
        <div className="container--box">
          <div className="upper--bar">
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
            {/* <span className="upper--bar--filter">
              <FontAwesomeIcon icon={faFilter} size="2x" />
              <button className="upperBar--subtitle" id="toggle">
                Filter
              </button>
            </span> */}
          </div>

          <div className="filter--box--layerTwo">
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
                <label
                  for="FilterRetrYear"
                  className="filter--label labelThree"
                >
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
          </div>

          <div className="table">
            <div className="table--content--box" id="TableBox">
              <table className="table--content">
                <thead className="table--header">
                  <tr className="table--row">
                    <th className="table--title th--name">Name</th>
                    <th className="table--title th--post">Post</th>
                    <th className="table--title th--gender">Gender</th>
                    <th className="table--title th--phone">Phone</th>
                    <th className="table--title th--email">Email</th>
                    <th className="table--title th--detail">Detail</th>
                  </tr>
                </thead>

                <tbody className="table--body">
                  {users
                    .filter((user) =>
                      keys.some((key) =>
                        user[key].toLowerCase().includes(search)
                      )
                    )
                    .map((user) => {
                      return (
                        <tr className="table--row" key={user._id}>
                          <td className="tableData td--name">
                            <ImageHelper user={user} />
                            {user.Name}
                          </td>
                          <td className="tableData td--post">
                            {user.postedDesignationName}
                          </td>
                          <td className="tableData td--gender">
                            {user.gender}
                          </td>
                          <td className="tableData td--phone">
                            {user.phoneNumber}
                          </td>
                          <td className="tableData td--email">{user.email}</td>
                          <td className="tableData td--detail">
                            <button
                              className="table--btn"
                              onClick={() => {
                                setmodal(true);
                                setmusers(user);
                              }}
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <RecordsModal
            onClose={() => setmodal(false)}
            user={muser}
            modal={modal}
            setmodal={setmodal}
          />
        </div>
      </div>
    </div>
  );
}
