import React, { useEffect, useState } from "react";
import ImageHelper from "../user/helper/ImageHelper";
import { verificationRecords } from "./helper";

import "./verifyStyle.css";

export default function VerifyUser() {
  const [users, setusers] = useState([]);
  const loadAllRecords = () => {
    verificationRecords().then((data) => {
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
                  {users.map((user, i) => {
                    return (
                      <tr class="table--row">
                        <td class="tableData td--name">
                          <ImageHelper user={user} />
                          Sumit Rawat
                        </td>
                        <td class="tableData td--post">SDE</td>
                        <td class="tableData td--gender">{user.gender}</td>
                        <td class="tableData td--phone">{user.phoneNumber}</td>
                        <td class="tableData td--email">{user.email}</td>
                        <td class="tableData td--detail">
                          <button class="table--btn">Detail</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
