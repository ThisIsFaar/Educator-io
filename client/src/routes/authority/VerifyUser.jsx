import React, { useEffect, useState } from "react";
import ImageHelper from "../user/helper/ImageHelper";
import { verificationRecords } from "./helper";
import VerifyModal from "./VerifyModal";
import "./recordModal.css";

export default function VerifyUser() {
  const [users, setusers] = useState([]);
  const [modal, setmodal] = useState(false);
  const [muser, setmusers] = useState({});
  const [reload, setReload] = useState(false);
  function refresh() {
    setReload(!reload);
  }
  const loadAllRecords = () => {
    verificationRecords().then((data) => {
      if (data.error) {
      } else {
        console.log('updated');
        setusers(data);
      }
    });
  };
  useEffect(() => {
    loadAllRecords();
    console.log(reload);
  }, [reload]);
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
                          {user.Name}
                        </td>
                        <td class="tableData td--post">
                          {user.postedDesignationName}
                        </td>
                        <td class="tableData td--gender">{user.gender}</td>
                        <td class="tableData td--phone">{user.phoneNumber}</td>
                        <td class="tableData td--email">{user.email}</td>
                        <td class="tableData td--detail">
                          {" "}
                          <button
                            class="table--btn"
                            onClick={() => {
                              setmodal(true);
                              setmusers(user);
                            }}
                            style={{ width: "13.6rem" }}
                          >
                            Detail And Verify
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <VerifyModal
            onClose={() => setmodal(false)}
            user={muser}
            modal={modal}
            setmodal={setmodal}
            refresh={refresh}
          />
        </div>
      </div>
    </div>
  );
}
