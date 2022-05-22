import React from "react";
import "./Application.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { application } from "./helper";
import { useState } from "react";
import { isAuthenticated } from "../../auth/helper";

// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";

const Joi = require("joi");
const { user, token } = isAuthenticated();
const Application = () => {
  const [values, setValues] = useState({
    Name: "",
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
    disabled: false,
    error: {},
    success: false,
  });
  const {
    error,
    Name,
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
    disabled,
  } = values;
  const schema = Joi.object({
    Name: Joi.string().min(4).max(20).required(),
    phoneNumber: Joi.string().min(10).max(20).required(),
    gender: Joi.string().min(4).max(20).required(),
    fatherName: Joi.string().min(4).max(20).required(),
    motherName: Joi.string().min(4).max(20).required(),
    spouse: Joi.string().min(4).max(20).required(),
    dateOfBirth: Joi.string().min(4).max(70).required(),
    dateOfJoining: Joi.string().min(4).max(70).required(),
    postedSchoolName: Joi.string().min(4).max(70).required(),
    postedDesignation: Joi.string().min(4).max(70).required(),
    postedSchoolLocation: Joi.string().min(4).max(70).required(),
    address: Joi.string().min(4).max(150).required(),
  });

  const handleChange = (name) => (event) => {
    console.log(event);
    const value =
      name === "profilePhoto" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
    // formData.set(name, event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { error } = schema.validate({
      Name,
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
    });

    if (error) {
      console.log("error");
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setValues({ ...values, error: error });
    } else {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("gender", gender);
      formData.append("fatherName", fatherName);
      formData.append("motherName", motherName);
      formData.append("spouse", spouse);
      formData.append("DOB", dateOfBirth);
      formData.append("dateOfJoining", dateOfJoining);
      formData.append("postedSchoolName", postedSchoolName);
      formData.append("postedDesignationName", postedDesignation);
      formData.append("postedSchoolLocation", postedSchoolLocation);
      formData.append("address", address);
      formData.append("profilePhoto", profilePhoto);
      console.log(user);
      application(user._id, token, formData)
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setValues({
              Name: "",
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
              formData: "",
              profilePhoto: null,
              disabled: true,
              error: {},
              success: true,
            });
            console.log(data.message);
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
    }
  };
  const form = () => {
    return (
      <form encType="multipart/form-data" className="container--box">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="form--innerBox">
          <div className="formBoxOne">
            <div className="FormOne">
              <div className="input-box">
                <label className="form--label">Name</label>
                <input
                  className="form--input"
                  onChange={handleChange("Name")}
                  value={Name}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Choose A Profile Photo</label>
                <input
                  onChange={handleChange("profilePhoto")}
                  type="file"
                  name="profilePhoto"
                  accept="image"
                  className=""
                />
              </div>
              {/* <div className="input-box">
        <label className="form--label">Email</label>
        <input className="form--input"           onChange={handleChange("")}
  value={} type="email" />
      </div> */}
              <div className="input-box">
                <label className="form--label">Phone</label>
                <input
                  className="form--input"
                  onChange={handleChange("phoneNumber")}
                  value={phoneNumber}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Gender</label>
                <input
                  className="form--input"
                  onChange={handleChange("gender")}
                  value={gender}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Father's Name</label>
                <input
                  className="form--input"
                  onChange={handleChange("fatherName")}
                  value={fatherName}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Mother's Name</label>
                <input
                  className="form--input"
                  onChange={handleChange("motherName")}
                  value={motherName}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="formBoxTwo">
            <div className="FormTwo">
              <div className="input-box">
                <label className="form--label">Spouse</label>
                <input
                  className="form--input"
                  onChange={handleChange("spouse")}
                  value={spouse}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Date of Birth</label>
                <input
                  className="form--input"
                  onChange={handleChange("dateOfBirth")}
                  value={dateOfBirth}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Date of Joining</label>
                <input
                  className="form--input"
                  onChange={handleChange("dateOfJoining")}
                  value={dateOfJoining}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Posted School Name</label>
                <input
                  className="form--input"
                  onChange={handleChange("postedSchoolName")}
                  value={postedSchoolName}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Posted Designation</label>
                <input
                  className="form--input"
                  onChange={handleChange("postedDesignation")}
                  value={postedDesignation}
                  type="text"
                />
              </div>
              <div className="input-box">
                <label className="form--label">Posted School Location</label>
                <input
                  className="form--input"
                  onChange={handleChange("postedSchoolLocation")}
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
                onChange={handleChange("address")}
                value={address}
                cols="10"
                rows="1"
              ></textarea>
            </div>
          </div>

          <div className="submit--btn">
            <button type="submit" onClick={onSubmit} className="btn">
              Submit Application
            </button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <div>
      {/* {disabled ? (
        <fieldset className="" disabled>
          {form()}{" "}
        </fieldset>
      ) : (
        )} */}
      {form()}
    </div>
  );
};

export default Application;
