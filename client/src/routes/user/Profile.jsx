import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper";
import { profile } from "./helper";
import ImageHelper from "./helper/ImageHelper";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    profilePhoto: "",
    phoneNumber: "",
    gender: "",
    fatherName: "",
    motherName: "",
    spouse: "",
    dateOfBirth: "",
    dateOfJoining: "",
    postedSchoolName: "",
    postedDesignation: "",
    postedSchoolLocation: "",
    address: "",
  });
  const {
    name,
    phoneNumber,
    gender,
    fatherName,
    motherName,
    spouse,
    dateOfBirth,
    dateOfJoining,
    postedSchoolName,
    postedDesignation,
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
          name: data.name,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          fatherName: data.fatherName,
          motherName: data.motherName,
          spouse: data.spouse,
          dateOfBirth: data.dataOfBirth,
          dateOfJoining: data.dateOfJoining,
          postedSchoolName: data.postedSchoolName,
          postedDesignation: data.postedDesignation,
          postedSchoolLocation: data.postedSchoolLocation,
          address: data.address,
          profilePhoto: data.profilePhoto,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form encType="multipart/form-data" className="container--box">
        <div className="form--innerBox">
          <div className="formBoxOne">
            <div className="FormOne">
              <div className="input-box">
                <label className="form--label">Name</label>
                <input className="form--input" value={name} type="text" />
              </div>
              <div className="input-box">
                <label className="form--label">Choose A Profile Photo</label>
                <ImageHelper user={user} />
              </div>
              <div className="input-box">
                <label className="form--label">Phone</label>
                <input
                  className="form--input"
                  value={phoneNumber}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Gender</label>
                <input className="form--input" value={gender} type="text" />
              </div>
              <div className="input-box">
                <label className="form--label">Father's Name</label>
                <input className="form--input" value={fatherName} type="text" />
              </div>
              <div className="input-box">
                <label className="form--label">Mother's Name</label>
                <input className="form--input" value={motherName} type="text" />
              </div>
            </div>
          </div>
          <div className="formBoxTwo">
            <div className="FormTwo">
              <div className="input-box">
                <label className="form--label">Spouse</label>
                <input className="form--input" value={spouse} type="text" />
              </div>
              <div className="input-box">
                <label className="form--label">Date of Birth</label>
                <input
                  className="form--input"
                  value={dateOfBirth}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Date of Joining</label>
                <input
                  className="form--input"
                  value={dateOfJoining}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Posted School Name</label>
                <input
                  className="form--input"
                  value={postedSchoolName}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Posted Designation</label>
                <input
                  className="form--input"
                  value={postedDesignation}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Posted School Location</label>
                <input
                  className="form--input"
                  value={postedSchoolLocation}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="formBoxThree">
          <div className="formThree">
            <div className="input--box inputBoxTwo">
              <label className="form--label three">Address</label>
              <textarea
                className="form--textarea"
                value={address}
                cols="10"
                rows="1"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
