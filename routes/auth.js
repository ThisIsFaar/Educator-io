var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  logout,
  register,
  login,
  verify,
  verified,
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

//Logout user
router.get("/logout", logout);

//Verifying user email
router.get("/verify/:userId/:uniqueString", verify);

//User redirection after verification
router.get("/verified", verified);

module.exports = router;
