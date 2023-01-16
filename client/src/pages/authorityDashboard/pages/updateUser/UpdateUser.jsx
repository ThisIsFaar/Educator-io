import React, { useEffect, useState } from 'react';
import { updateRecords } from '../../helper';
// import './recordStyle.css';
import ImageHelper from '../../../../component/ImageHelper';
// import RecordsModal from '../RecordsModal';
import UpdateReqModal from '../../components/modal/updateReqModal/updateReqModal';

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
      <div className="right--outer--layer">
        <div className="container--box">
          <div className="table">
            <div className="table--content--box" id="TableBox">
              <table className="table--content">
                <thead className="table--header">
                  <tr className="table--row">
                    <th className="table--title th--name">Name</th>
                    <th className="table--title th--email">Email</th>
                    <th className="table--title th--Remark">Remark</th>
                    <th className="table--title th--detail">Detail</th>
                  </tr>
                </thead>

                <tbody className="table--body">
                  {users.map((user, i) => {
                    return (
                      <tr className="table--row">
                        <td className="tableData td--name">
                          <ImageHelper user={user.user} />
                          {user.user.Name}
                        </td>
                        <td className="tableData td--email">
                          {user.user.email}
                        </td>
                        <td className="tableData td--remark">{user.message}</td>
                        <td className="tableData td--detail">
                          <button
                            className="table--btn"
                            onClick={() => {
                              setmodal(true);
                              setmusers(user.user);
                              setudata(user);
                            }}
                            style={{ width: '13.6rem' }}
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
