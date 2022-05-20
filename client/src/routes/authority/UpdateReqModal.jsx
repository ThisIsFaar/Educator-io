import React from "react";
import "./recordModal.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageHelper from "../user/helper/ImageHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { acceptUpdateReq, rejectUpdateReq } from "./helper";
import { isAuthenticated } from "../../auth/helper";

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
  if (updateData.postedDesignation !== "") {
    data.postedDesignation = updateData.postedDesignation;
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

  const onReject = (user) => {
    rejectUpdateReq(user, data)
      .then((data) => {
        if (data.status === 200) {
          console.log(data.message);
        } else if (data.status === 400) {
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={"modal " + (modal && "active")}>
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
      <div className="wrapper" style={{ width: "30vw" }}>
        <div
          className="left-container"
          style={{ justifyContent: "space-evenly" }}
        >
          <div className="profile-image" style={{ height: "30%" }}>
            <ImageHelper user={muser} />
          </div>
          <div className="info">
            <div className="updateinfo">
              <div style={{ fontSize: "3rem" }}>Update Details</div>
              <div>
                <span>Phone</span>: <span>{updateData.phoneNumber}</span>
              </div>

              <div>
                <span>Address</span>:{" "}
                <span>
                  {updateData.address
                    ? updateData.address
                    : "No Updates Required"}
                </span>
              </div>

              <div>
                <span>School Name</span>:{" "}
                <span>
                  {updateData.postedSchoolName
                    ? updateData.postedSchoolName
                    : "No Updates Required"}
                </span>
              </div>
              <div>
                <span>School Location</span>:{" "}
                <span>
                  {updateData.postedSchoolLocation
                    ? updateData.postedSchoolLocation
                    : "No Updates Required"}
                </span>
              </div>

              <div>
                <span>Posted Designation</span>:{" "}
                <span>
                  {updateData.postedDesignation
                    ? updateData.postedDesignation
                    : "No Updates Required"}
                </span>
              </div>

              <div>
                <span>Date Of Joining</span>:{" "}
                <span>
                  {updateData.dateOfJoining
                    ? updateData.dateOfJoining
                    : "No Updates Required"}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "space-around",
            }}
          >
            <button
              onClick={onAccept}
              style={{
                padding: "1rem",
                borderRadius: "1rem",
                cursor: "pointer",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Accept
            </button>

            <button
              onClick={onReject}
              style={{
                padding: "1rem",
                borderRadius: "1rem",
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Reject
            </button>
          </div>
          <button
            onClick={() => setmodal(!modal)}
            style={{ padding: "1rem", borderRadius: "1rem", cursor: "pointer" }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
