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
<<<<<<< HEAD
  updateUserVerification,
  getUserById,
  rejectUserVerification,
=======
  getAllupdateRequest
>>>>>>> 90e5d6fa75f9c074a07ef3e006aad8d3f31723ef
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

router.get("/authority/records", getAllRecords);
router.get("/authority/updateRequest", getAllupdateRequest);
router.get("/authority/verify", getRecordForVerify);

<<<<<<< HEAD
router.put("/authority/verifyUser/:userId", updateUserVerification);
router.put("/authority/rejectUser/:userId", rejectUserVerification);
=======
>>>>>>> 90e5d6fa75f9c074a07ef3e006aad8d3f31723ef

module.exports = router;
