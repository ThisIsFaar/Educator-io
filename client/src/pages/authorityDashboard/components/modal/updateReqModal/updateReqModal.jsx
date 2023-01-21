import React from "react";
import "./updateReqModal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { acceptUpdateReq, rejectUpdateReq } from "../../../helper";
import { isAuthenticated } from "../../../../../api";

export default function UpdateReqModal({
  muser,
  modal,
  setmodal,
  onClose,
  updateData,
}) {
  const { user, token } = isAuthenticated();
  let data = {};
  if (updateData.phoneNumber !== "") {
    data.phoneNumber = updateData.phoneNumber;
  }
  if (updateData.dateOfJoining !== "") {
    data.dateOfJoining = updateData.dateOfJoining;
  }
  if (updateData.postedDesignationName !== "") {
    data.postedDesignationName = updateData.postedDesignationName;
  }
  if (updateData.postedSchoolLocation !== "") {
    data.postedSchoolLocation = updateData.postedSchoolLocation;
  }
  if (updateData.postedSchoolName !== "") {
    data.postedSchoolName = updateData.postedSchoolName;
  }
  if (updateData.address !== "") {
    data.address = updateData.address;
  }
  data.userId = muser._id;

  console.log(data);

  // user.data= data;
  const onAccept = () => {
    acceptUpdateReq(user, token, muser, data)
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (data.status === 400) {
          toast.error(data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const onReject = () => {
    rejectUpdateReq(user, token, muser, data)
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (data.status === 400) {
          toast.error(data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={"updatemodal " + (modal && "active")}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update Details
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
                onClick={() => setmodal(!modal)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Phone
                    </th>
                    <td className="px-6 py-4">{updateData.phoneNumber}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Address
                    </th>
                    <td className="px-6 py-4">
                      {updateData.address
                        ? updateData.address
                        : "No Updates Required"}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      School Name
                    </th>
                    <td className="px-6 py-4">
                      {updateData.postedSchoolName
                        ? updateData.postedSchoolName
                        : "No Updates Required"}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      School Location
                    </th>
                    <td className="px-6 py-4">
                      {updateData.postedSchoolLocation
                        ? updateData.postedSchoolLocation
                        : "No Updates Required"}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Posted Designation
                    </th>
                    <td className="px-6 py-4">
                      {updateData.postedDesignationName
                        ? updateData.postedDesignationName
                        : "No Updates Required"}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Date of joining
                    </th>
                    <td className="px-6 py-4">
                      {updateData.dateOfJoining
                        ? updateData.dateOfJoining
                        : "No Updates Required"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="staticModal"
                type="button"
                onClick={onAccept}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>

              <button
                data-modal-hide="staticModal"
                type="button"
                onClick={onReject}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
