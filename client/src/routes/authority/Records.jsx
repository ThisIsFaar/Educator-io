import {
  faArrowUpWideShort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { records } from "./helper";
import "./recordStyle.css";
import ImageHelper from "../user/helper/ImageHelper";
import RecordsModal from "./RecordsModal";

export default function Records() {
  const [users, setusers] = useState([]);
  const [modal, setmodal] = useState(false);
  const [muser, setmusers] = useState({});
  const [search, setsearch] = useState("");
  const keys = ["Name", "email", "postedDesignationName"];

  const loadAllRecords = () => {
    records().then((data) => {
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
      <div class="right--outer--layer">
        <div class="container--box">
          <div class="upper--bar">
            <span class="upper--bar--title">Teacher's Records</span>
            <span class="search--box">
              <input
                type="text"
                class="upper--bar--searchBox"
                placeholder="Search"
                onChange={(event) => {
                  setsearch(event.target.value);
                }}
              />
            </span>
            {/*<span class="upperbar--sortBy--box">
              <FontAwesomeIcon icon={faArrowUpWideShort} size="2x" />
              <select class="upperBar--sortBy">
                <option class="sortby--options" selected>
                  Sort By
                </option>
                <option class="sortby--options" value="1">
                  -Text-
                </option>
                <option class="sortby--options" value="2">
                  -Text2-
                </option>
                <option class="sortby--options" value="3">
                  -Text3-
                </option>
              </select>
              </span>*/}
            <span class="upper--bar--filter">
              <FontAwesomeIcon icon={faFilter} size="2x" />
              <button class="upperBar--subtitle" id="toggle">
                Filter
              </button>
            </span>
          </div>

          <div class="filter--box--layerTwo">
            <div class="filter--box" id="filter--box">
              <div class="filterbox--innerLayer">
                <input
                  type="text"
                  class="field fld--one"
                  placeholder="Search by name here.."
                />
                <select class="field fld--two" id="Customer">
                  <option selected>Designation</option>
                  <option value="1">HTML</option>
                  <option value="2">CSS</option>
                  <option value="3">JavaScript</option>
                </select>
                <label for="joiningDAte" class="filter--label labelOne">
                  Joining date
                </label>
                <input type="date" class="field fld--three" id="joiningDAte" />
                <label for="FilterDob" class="filter--label labelTwo">
                  DOB
                </label>
                <input type="date" class="field fld--four" id="FilterDob" />
              </div>

              <div class="filterbox--innerLayerTwo">
                <input
                  type="Text"
                  class="field fld--five"
                  id="FilterSchool"
                  placeholder="Search by school here.."
                />
                <label for="FilterRetrYear" class="filter--label labelThree">
                  Retirement year
                </label>
                <input type="date" class="field fld--six" id="FilterRetrYear" />
                <button class="fields--btn" type="submit">
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div class="table">
            <div class="table--content--box" id="TableBox">
              <table class="table--content">
                <thead class="table--header">
                  <tr class="table--row">
                    <th class="table--title th--name">Name</th>
                    <th class="table--title th--post">Post</th>
                    <th class="table--title th--gender">Gender</th>
                    <th class="table--title th--phone">Phone</th>
                    <th class="table--title th--email">Email</th>
                    <th class="table--title th--detail">Detail</th>
                  </tr>
                </thead>

                <tbody class="table--body">
                  {users
                    .filter((user) =>
                      keys.some((key) =>
                        user[key].toLowerCase().includes(search)
                      )
                    )
                    .map((user) => {
                      return (
                        <tr class="table--row" key={user._id}>
                          <td class="tableData td--name">
                            <ImageHelper user={user} />
                            {user.Name}
                          </td>
                          <td class="tableData td--post">
                            {user.postedDesignationName}
                          </td>
                          <td class="tableData td--gender">{user.gender}</td>
                          <td class="tableData td--phone">
                            {user.phoneNumber}
                          </td>
                          <td class="tableData td--email">{user.email}</td>
                          <td class="tableData td--detail">
                            <button
                              class="table--btn"
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
