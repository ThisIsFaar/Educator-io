import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper";
import { profile } from "./helper";
import Dp from "../../common/images/sampledp.png";
import ImageHelper from "./helper/ImageHelper";
import "./Profile.css";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    profilePhoto: "",
    phoneNumber: "",
    gender: "",
    fatherName: "",
    motherName: "",
    spouse: "",
    dateOfBirth: "",
    dateOfJoining: "",
    postedSchoolName: "",
    postedDesignationName: "",
    postedSchoolLocation: "",
    address: "",
  });
  const {
    name,
    phoneNumber,
    email,
    gender,
    fatherName,
    motherName,
    spouse,
    dateOfBirth,
    dateOfJoining,
    postedSchoolName,
    postedDesignationName,
    postedSchoolLocation,
    address,
    profilePhoto,
  } = values;
  useEffect(() => {
    preload();
  }, []);
  const { user, token } = isAuthenticated();
  const preload = () => {
    profile(user._id, token)
      .then((data) => {
        console.log("DATA WE GET IS: ", data);
        setValues({
          name: data.Name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          fatherName: data.fatherName,
          motherName: data.motherName,
          spouse: data.spouse,
          dateOfBirth: data.DOB,
          dateOfJoining: data.dateOfJoining,
          postedSchoolName: data.postedSchoolName,
          postedDesignationName: data.postedDesignationName,
          postedSchoolLocation: data.postedSchoolLocation,
          address: data.address,
          profilePhoto: data.profilePhoto,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="wrapper">
      <div className="left-container">
        <div className="profile-image">
          <ImageHelper user={user} />
        </div>
        <div className="info">
          <p className="name">{name}</p>

          <p className="email">
            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> &nbsp;
            {email}
          </p>
          <div className="phone">
            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>&nbsp;{" "}
            {phoneNumber}
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="personal">
          <div className="head">Personal</div>
          <div className="p-info">
            <div>
              <label>Date Of Birth: </label>
              <span>{dateOfBirth}</span>
            </div>
            <div>
              <label>Mother's Name: </label>
              <span>{motherName}</span>
            </div>
            <div>
              <label>Father's Name: </label>
              <span>{fatherName}</span>
            </div>
            <div>
              <label>Address: </label>
              <span>{address}</span>
            </div>
          </div>
        </div>
        <div className="school">
          <div className="head">School</div>
          <div className="p-info">
            <div>
              <label>Designation: </label>
              <span>{postedDesignationName}</span>
            </div>
            <div>
              <label>Posted School: </label>
              <span>{postedSchoolName}</span>
            </div>
            <div>
              <label>Posted School Location: </label>
              <span>{postedSchoolLocation}</span>
            </div>
            <div>
              <label>Date Of Joining: </label>
              <span>{dateOfJoining}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
