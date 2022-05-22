import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper";
import { updateReq } from "./helper/backendreq";
import ImageHelper from "./helper/ImageHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRequest = () => {
  const [phoneUpdate, setphoneUpdate] = useState(true);
  const [addressUpdate, setaddressUpdate] = useState(true);
  const [schoolUpdate, setschoolUpdate] = useState(true);
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    phoneNumber: "",
    address: "",
    dateOfJoining: "",
    postedSchoolName: "",
    postedDesignation: "",
    postedSchoolLocation: "",
    message: "",
    disabled: false,
    error: {},
    success: false,
  });
  const {
    error,
    phoneNumber,
    address,
    dateOfJoining,
    postedSchoolName,
    postedDesignation,
    postedSchoolLocation,
    message,
    profilePhoto,
    disabled,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateReq({
      phoneNumber,
      address,
      dateOfJoining,
      postedSchoolName,
      postedDesignation,
      postedSchoolLocation,
      user,
      message,
      token,
    })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setValues({
            phoneNumber: "",
            dateOfJoining: "",
            postedSchoolName: "",
            postedDesignation: "",
            postedSchoolLocation: "",
            address: "",
            disabled: true,
            error: {},
            success: true,
            message: "",
          });
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
    <div>
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
              {/* Phone Update Section */}

              {phoneUpdate ? (
                <div className="input-box">
                  <div
                    className="update-input-checked"
                    style={{
                      border: "2px green solid",
                      padding: "1rem",
                      borderRadius: "1rem",
                    }}
                  >
                    <label className="form--label">Phone</label>
                    <input
                      className="form--input"
                      value={phoneNumber}
                      type="text"
                      onChange={handleChange("phoneNumber")}
                    />
                    <input
                      type="checkbox"
                      class="form--checkbox"
                      onClick={() => {
                        setphoneUpdate(false);
                      }}
                      checked
                    />
                  </div>
                </div>
              ) : (
                <div className="input-box " style={{ display: "flex" }}>
                  <label className="form--label">Phone</label>
                  <input
                    type="checkbox"
                    class="form--checkbox"
                    onClick={() => {
                      setphoneUpdate(true);
                    }}
                  />
                </div>
              )}

              {/* Address Update Section */}
              {addressUpdate ? (
                <div className="input-box">
                  <div
                    className="update-input-checked"
                    style={{
                      border: "2px green solid",
                      padding: "1rem",
                      borderRadius: "1rem",
                    }}
                  >
                    <label className="form--label">Address</label>
                    <textarea
                      className="form--textarea"
                      value={address}
                      style={{
                        width: "25rem",
                      }}
                      onChange={handleChange("address")}
                    ></textarea>
                    <input
                      type="checkbox"
                      class="form--checkbox"
                      onClick={() => {
                        setaddressUpdate(false);
                      }}
                      checked
                    />
                  </div>
                </div>
              ) : (
                <div className="input-box" style={{ display: "flex" }}>
                  <label className="form--label">Address</label>
                  <input
                    type="checkbox"
                    class="form--checkbox"
                    onClick={() => {
                      setaddressUpdate(true);
                    }}
                  />
                </div>
              )}

              {/* School Update */}
              {schoolUpdate ? (
                <div className="input-box">
                  <div
                    className="update-input-checked"
                    style={{
                      border: "2px green solid",
                      padding: "1rem",
                      borderRadius: "1rem",
                    }}
                  >
                    <label className="form--label">Posted School Name</label>
                    <input
                      className="form--input "
                      onChange={handleChange("postedSchoolName")}
                      value={postedSchoolName}
                      type="text"
                    />
                    <label className="form--label">Posted Designation</label>
                    <input
                      className="form--input "
                      onChange={handleChange("postedDesignation")}
                      value={postedDesignation}
                      type="text"
                    />
                    <label className="form--label">
                      Posted School Location
                    </label>
                    <input
                      className="form--input "
                      onChange={handleChange("postedSchoolLocation")}
                      value={postedSchoolLocation}
                      type="text"
                    />
                    <label className="form--label">Date Of Joining</label>
                    <input
                      className="form--input "
                      onChange={handleChange("dateOfJoining")}
                      value={dateOfJoining}
                      type="text"
                    />
                    <input
                      type="checkbox"
                      class="form--checkbox"
                      onClick={() => {
                        setschoolUpdate(false);
                      }}
                      checked
                    />
                  </div>
                </div>
              ) : (
                <div className="input-box" style={{ display: "flex" }}>
                  <label className="form--label">Add School</label>
                  <input
                    type="checkbox"
                    class="form--checkbox"
                    onClick={() => {
                      setschoolUpdate(true);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="input--box" style={{ margin: "5rem" }}>
          <label className="form--label">Remarks/Message</label>
          {/* <input
              className="form--input "
              onChange={handleChange("message")}
              value={message}
              type="text"
              style={{padding:"5rem"}}
            /> */}
          <textarea
            className="form--textarea"
            value={message}
            style={{
              width: "25rem",
            }}
            onChange={handleChange("message")}
          ></textarea>
        </div>
        <button
          type="submit"
          name="Login"
          className="btn--login"
          onClick={onSubmit}
        >
          Request for Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRequest;
