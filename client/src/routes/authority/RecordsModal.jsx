import React from "react";
import "./recordModal.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageHelper from "../user/helper/ImageHelper";

export default function RecordsModal({ user, modal, setmodal }) {
  return (
    <div
      className={"Recordsmodal " + (modal && "active")}
      onClick={() => setmodal(!modal)}
    >
      <div className="Recordswrapper">
        <div className="Record-left">
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
        <div className="Record-right">
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
                <span>{user.postedDesignationName}</span>
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
