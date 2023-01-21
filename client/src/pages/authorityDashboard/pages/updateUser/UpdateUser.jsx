import React, { useEffect, useState } from "react";
import { updateRecords } from "../../helper";
import ImageHelper from "../../../../component/ImageHelper";
import UpdateReqModal from "../../components/modal/updateReqModal/updateReqModal";

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
    <div className="w-full h-full overflow-auto">
      <div className="relative overflow-auto">
        <table className="w-full text-sm text-left overflow-auto text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                Photo
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Remark
              </th>
              <th scope="col" className="px-6 py-3">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <ImageHelper user={user.user} />
                </th>
                <td className="px-6 py-4">{user.user.Name}</td>
                <td className="px-6 py-4">{user.user.email}</td>
                <td className="px-6 py-4">{user.message}</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      setmodal(true);
                      setmusers(user.user);
                      setudata(user);
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
      <UpdateReqModal
        onClose={() => setmodal(false)}
        muser={muser}
        modal={modal}
        setmodal={setmodal}
        updateData={udata}
      />
    </div>
  );
}
