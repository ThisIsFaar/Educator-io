import React from "react";
import "./Verifymodal.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageHelper from "../user/helper/ImageHelper";
import { verifyUser, rejectUser } from "./helper";

export default function VerifyModal({ user, modal, setmodal, refresh }) {
  const onAccept = () => {
    verifyUser(user._id).then((data) => {
      console.log(data);
    });
  };

  const onReject = () => {
    rejectUser(user._id).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className={"verifymodal " + (modal && "active")}>
      <div className="Verifywrapper" onClick={() => setmodal(!modal)}>
        <div className="Verify-left">
          <div className="profile-image">
            <ImageHelper user={user} />
          </div>
          <div className="info">
            <p className="name">{user.Name}</p>

            <p className="email">
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> &nbsp;
              {user.email}
            </p>
            <div className="phone">
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>&nbsp;
              {user.phoneNumber}
            </div>
          </div>
        </div>
        <div className="Verify-right">
          <div className="personal">
            <div className="head">Personal</div>
            <div className="p-info">
              <div>
                <label>Date Of Birth: </label>
                <span>{user.DOB}</span>
              </div>
              <div>
                <label>Gender: </label>
                <span>{user.gender}</span>
              </div>
              <div>
                <label>Mother's Name: </label>
                <span>{user.motherName}</span>
              </div>
              <div>
                <label>Father's Name: </label>
                <span>{user.fatherName}</span>
              </div>
              <div>
                <label>Address: </label>
                <span>{user.address}</span>
              </div>
            </div>
          </div>
          <div className="school">
            <div className="head">School</div>
            <div className="p-info">
              <div>
                <label>Designation: </label>
                <span>{user.currentDesignationPost}</span>
              </div>
              <div>
                <label>Posted School: </label>
                <span>{user.postedSchoolName}</span>
              </div>
              <div>
                <label>Posted School Location: </label>
                <span>{user.postedSchoolLocation}</span>
              </div>
              <div>
                <label>Date Of Joining: </label>
                <span>{user.dateOfJoining}</span>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button
              className="Accept"
              onClick={() => {
                onAccept()
                setTimeout(()=>{
                  refresh()
                },1000)
              }}
            >
              Accept
            </button>
            <button
              className="Reject"
              onClick={() => {
                onReject();
                setTimeout(()=>{
                  refresh()
                },1000)
              }}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
