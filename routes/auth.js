var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  logout,
  register,
  login,
  verify,
  verified,
  verifyOtp,
  resetPassword,
  resetForm,
  resetFormSubmit,
  getAllRecords,
  getRecordForVerify,
  updateUserVerification,
  getUserById,
  rejectUserVerification,
  getAllupdateRequest,
} = require("../controllers/auth");

//Register user
router.post(
  "/register",
  [
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 6 digits").isLength({
      min: 6,
    }),
  ],
  register
);

//Login user
router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is short").isLength({ min: 6 }),
  ],
  login
);
router.param("userId", getUserById);
//Logout user
router.get("/logout", logout);

//Verifying user email
router.get("/verify/:userId/:uniqueString", verify);

//Verifying authority otp
router.post("/verifyotp/:userId/:otp", verifyOtp);

router.post("/resetPassword/:email", resetPassword);

//Verifying user reset link
router.get("/resetForm/:userId/:uniqueString", resetForm);

//Resetting user password
router.get("/resetFormSubmit/:userId/:password/", resetFormSubmit);

//User redirection after particular verification status
router.get("/verified", verified);

//Showing Records Routes
router.get("/authority/records", getAllRecords);
router.get("/authority/updateRequest", getAllupdateRequest);
router.get("/authority/verify", getRecordForVerify);

//User Verification Routes
router.put("/authority/verifyUser/:userId", updateUserVerification);
router.put("/authority/rejectUser/:userId", rejectUserVerification);

module.exports = router;
