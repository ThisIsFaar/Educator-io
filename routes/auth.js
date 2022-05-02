var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  signout,
  register,
  signin,
  isSignedIn,
} = require("../controllers/auth");

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

module.exports = router;
