import React, { useEffect, useState } from 'react';
import ImageHelper from '../../../../api/ImageHelper';
import { verificationRecords } from '../../helper';
import VerifyModal from '../../components/modal/verifyModal/verifyModal';

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
      <div className="right--outer--layer">
        <div className="container--box">
          <div className="table">
            <div className="table--content--box" id="TableBox">
              <table className="table--content">
                <thead className="table--header">
                  <tr className="table--row">
                    <th className="table--title th--name">Name</th>
                    <th className="table--title th--phone">Phone</th>
                    <th className="table--title th--email">Email</th>
                    <th className="table--title th--detail">Detail</th>
                  </tr>
                </thead>

                <tbody className="table--body">
                  {users.map((user, i) => {
                    return (
                      <tr className="table--row">
                        <td className="tableData td--name">
                          <ImageHelper user={user} />
                          {user.Name}
                        </td>
                        <td className="tableData td--post">
                          {user.postedDesignationName}
                        </td>
                        <td className="tableData td--gender">{user.gender}</td>
                        <td className="tableData td--phone">
                          {user.phoneNumber}
                        </td>
                        <td className="tableData td--email">{user.email}</td>
                        <td className="tableData td--detail">
                          {' '}
                          <button
                            className="table--btn"
                            onClick={() => {
                              setmodal(true);
                              setmusers(user);
                            }}
                            style={{ width: '13.6rem' }}
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
