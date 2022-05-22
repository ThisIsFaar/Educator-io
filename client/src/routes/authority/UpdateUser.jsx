import {
  faArrowUpWideShort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { updateRecords } from "./helper";
import "./recordStyle.css";
import ImageHelper from "../user/helper/ImageHelper";
import RecordsModal from "./RecordsModal";
import UpdateReqModal from "./UpdateReqModal";

export default function UpdateUser() {
  const [users, setusers] = useState([]);
  const [modal, setmodal] = useState(false);
  const [muser, setmusers] = useState({});
  const [udata, setudata] = useState({});
  const loadAllRecords = () => {
    updateRecords().then((data) => {
      if (data.error) {
      } else {
        console.log(data);
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
                    <th class="table--title th--email">Email</th>
                    <th class="table--title th--Remark">Remark</th>
                    <th class="table--title th--detail">Detail</th>
                  </tr>
                </thead>

                <tbody class="table--body">
                  {users.map((user, i) => {
                    return (
                      <tr class="table--row">
                        <td class="tableData td--name">
                          <ImageHelper user={user.user} />
                          {user.user.Name}
                        </td>
                        <td class="tableData td--email">{user.user.email}</td>
                        <td class="tableData td--remark">{user.message}</td>
                        <td class="tableData td--detail">
                          <button
                            class="table--btn"
                            onClick={() => {
                              setmodal(true);
                              setmusers(user.user);
                              setudata(user);
                            }}
                            style={{ width: "13.6rem" }}
                          >
                            Detail and Verify
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <UpdateReqModal
            onClose={() => setmodal(false)}
            muser={muser}
            modal={modal}
            setmodal={setmodal}
            updateData={udata}
          />
        </div>
      </div>
    </div>
  );
}
