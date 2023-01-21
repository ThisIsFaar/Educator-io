import React, { useEffect, useState } from "react";
import ImageHelper from "../../../../component/ImageHelper";
import { verificationRecords } from "../../helper";
import VerifyModal from "../../components/modal/verifyModal/verifyModal";

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
        console.log("updated");
        setusers(data);
      }
    });
  };
  useEffect(() => {
    loadAllRecords();
    console.log(reload);
  }, [reload]);
  return (
    <div className="right--outer--layer w-full h-full overflow-auto">
      <div className="container--box">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="px-6 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <ImageHelper user={user} />
                  </th>
                  <td className="px-6 py-4">{user.Name}</td>
                  <td className="px-6 py-4">{user.postedDesignationName}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setmodal(true);
                        setmusers(user);
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

        <VerifyModal
          onClose={() => setmodal(false)}
          user={muser}
          modal={modal}
          setmodal={setmodal}
          refresh={refresh}
        />
      </div>
    </div>
  );
}
