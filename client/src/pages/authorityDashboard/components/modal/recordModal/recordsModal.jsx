import React from "react";
import "./recordModal.css";
import ImageHelper from "../../../../../component/ImageHelper";

export default function RecordsModal({ user, modal, setmodal }) {
  return (
    <div
      className={"Recordsmodal " + (modal ? "active" : "hidden")}
      onClick={() => setmodal(!modal)}
    >
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div className="relative w-full h-full max-w-2xl md:h-">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex overflow-auto items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Teacher's Details
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
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="w-full h-full overflow-auto">
              <div className="w-full h-full">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <td>
                          <ImageHelper user={user} />
                        </td>
                        <td className="pl-3">
                          <div className="text-base font-semibold">
                            {user.Name}
                          </div>
                          <div className="font-normal text-gray-500">
                            {user.email}
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Name
                        </th>
                        <td className="px-6 py-4">{user.Name}</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Email
                        </th>
                        <td className="px-6 py-4">{user.email}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Phone Number
                        </th>
                        <td className="px-6 py-4">{user.phoneNumber}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Date Of Birth
                        </th>
                        <td className="px-6 py-4">{user.DOB}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Gender
                        </th>
                        <td className="px-6 py-4">{user.gender}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Mother's Name
                        </th>
                        <td className="px-6 py-4">{user.motherName}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Father's Name
                        </th>
                        <td className="px-6 py-4">{user.fatherName}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Address
                        </th>
                        <td className="px-6 py-4">{user.address}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Designation
                        </th>
                        <td className="px-6 py-4">
                          {user.currentDesignationPost}
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Posted School
                        </th>
                        <td className="px-6 py-4">{user.postedSchoolName}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Posted School Location
                        </th>
                        <td className="px-6 py-4">
                          {user.postedSchoolLocation}
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Date Of Joining
                        </th>
                        <td className="px-6 py-4">{user.dateOfJoining}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
