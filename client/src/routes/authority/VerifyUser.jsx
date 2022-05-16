import {
  faArrowUpWideShort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./verifyStyle.css";

export default function VerifyUser() {
  return (
    <div>
      <div class="right--outer--layer">
        <div class="container--box">
          <div class="table">
            <div class="table--content--box" id="TableBox">
              <table class="table--content">
                <thead class="table--header">
                  <tr class="table--row">
                    <th class="table--title th--name">Name</th>
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
                    <td class="tableData td--phone">7011361886</td>
                    <td class="tableData td--email">
                      rathorejatin168@gmail.com
                    </td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail and Verify</button>
                    </td>
                  </tr>

                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Jatin Rathore
                    </td>
                    <td class="tableData td--phone">7011361886</td>
                    <td class="tableData td--email">
                      rathorejatin168@gmail.com
                    </td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail and Verify</button>
                    </td>
                  </tr>

                  <tr class="table--row">
                    <td class="tableData td--name">
                      <img src="images/user_dark.svg" class="table--svg" />
                      Jatin Rathore
                    </td>
                    <td class="tableData td--phone">7011361886</td>
                    <td class="tableData td--email">
                      rathorejatin168@gmail.com
                    </td>
                    <td class="tableData td--detail">
                      <button class="table--btn">Detail and Verify</button>
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
