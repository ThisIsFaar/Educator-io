var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { apply , getUserById} = require("../controllers/application");
const { isLogin, isAuthenticated, isAuthority } = require("../controllers/auth");


//Get User By Id Parameter
router.param("userId", getUserById);

//Submitting Form, updating user details
router.put(
    "/application/:userId",
    isLogin,
    isAuthenticated,
    apply
  );
  
module.exports = router;
