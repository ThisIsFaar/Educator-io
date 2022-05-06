var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { logout, register, login, verify, verified } = require("../controllers/auth");

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

router.get("/logout", logout);

router.get(
  "/verify/:userId/:uniqueString",
  verify
);

router.get(
  "/verified",
  verified
);

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is short").isLength({ min: 6 }),
  ],
  login
);

module.exports = router;
