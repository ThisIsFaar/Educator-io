import React from "react";
import "./recordModal.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageHelper from "../user/helper/ImageHelper";

export default function RecordsModal({ user, modal, setmodal, onClose }) {
  const techer = user;
  console.log(user);
  return (
    <div
      className={"modal " + (modal && "active")}
      onClick={() => setmodal(!modal)}
    >
      <div className="wrapper">
        {/*<div className="modal-header">
          <h4 className="modal-title">{user.Name}</h4>
        </div>
        <div className="modal-body">{user.email}</div>
        <div className="modal-footer">
          <button onClick={() => setmodal(!modal)} className="button">
            Close
          </button>
        </div>
  </div>*/}
        <div className="left-container">
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
        <div className="right-container">
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
        </div>
      </div>
    </div>
  );
}
