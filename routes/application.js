var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { apply } = require("../controllers/application");
const { isLogin, isAuthenticated, isAuthority } = require("../controllers/auth");



router.post(
    "/application/:userId",
    isLogin,
    isAuthenticated,
    apply
  );
  
module.exports = router;
