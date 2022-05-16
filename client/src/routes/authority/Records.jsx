import {
  faArrowUpWideShort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./recordStyle.css";

export default function Records() {
  return (
    <div>
      <div class="right--outer--layer">
        {/*<div class="header">
          <img src="images/back-button.svg" class="header--back--btn" />
          <p class="header--title">Admin Dashboard</p>
          <p class="header--sub--title">Dr. Neeraj Garg</p>
          <img src="images/user_dark.svg" class="header--logo" />
          <button class="sidebar--btn" id="toggleBtn">
            <img src="images/sidebar-button.svg" />
          </button>
  </div>*/}
        <div class="container--box">
          <div class="upper--bar">
            <span class="upper--bar--title">Teacher's Records</span>
            <span class="search--box">
              <input
                type="text"
                class="upper--bar--searchBox"
                placeholder="Search"
              />
            </span>
            <span class="upperbar--sortBy--box">
              <FontAwesomeIcon icon={faArrowUpWideShort} />
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
            </span>
            <span class="upper--bar--filter">
              <FontAwesomeIcon icon={faFilter} />
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
                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Jatin Rathore
                    </td>
                    <td class="tableData td--post">TL</td>
                    <td class="tableData td--gender">Male</td>
                    <td class="tableData td--phone">7011361886</td>
                    <td class="tableData td--email">
                      rathorejatin168@gmail.com
                    </td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail</button>
                    </td>
                  </tr>

                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Sumit Rawat
                    </td>
                    <td class="tableData td--post">SDE</td>
                    <td class="tableData td--gender">Male</td>
                    <td class="tableData td--phone">9534361886</td>
                    <td class="tableData td--email">sumitrawat420@gmail.com</td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail</button>
                    </td>
                  </tr>

                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Vipul Kumar
                    </td>
                    <td class="tableData td--post">SDE</td>
                    <td class="tableData td--gender">Male</td>
                    <td class="tableData td--phone">8411369416</td>
                    <td class="tableData td--email">kumarvipul69@gmail.com</td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail</button>
                    </td>
                  </tr>
                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Vipul Kumar
                    </td>
                    <td class="tableData td--post">SDE</td>
                    <td class="tableData td--gender">Male</td>
                    <td class="tableData td--phone">8411369416</td>
                    <td class="tableData td--email">kumarvipul69@gmail.com</td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail</button>
                    </td>
                  </tr>
                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Vipul Kumar
                    </td>
                    <td class="tableData td--post">SDE</td>
                    <td class="tableData td--gender">Male</td>
                    <td class="tableData td--phone">8411369416</td>
                    <td class="tableData td--email">kumarvipul69@gmail.com</td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail</button>
                    </td>
                  </tr>

                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Vipul Kumar
                    </td>
                    <td class="tableData td--post">SDE</td>
                    <td class="tableData td--gender">Male</td>
                    <td class="tableData td--phone">8411369416</td>
                    <td class="tableData td--email">kumarvipul69@gmail.com</td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail</button>
                    </td>
                  </tr>

                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Vipul Kumar
                    </td>
                    <td class="tableData td--post">SDE</td>
                    <td class="tableData td--gender">Male</td>
                    <td class="tableData td--phone">8411369416</td>
                    <td class="tableData td--email">kumarvipul69@gmail.com</td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail</button>
                    </td>
                  </tr>

                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Vipul Kumar
                    </td>
                    <td class="tableData td--post">SDE</td>
                    <td class="tableData td--gender">Male</td>
                    <td class="tableData td--phone">8411369416</td>
                    <td class="tableData td--email">kumarvipul69@gmail.com</td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
