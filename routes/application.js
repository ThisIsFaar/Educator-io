var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { apply , getUserById} = require("../controllers/application");
const { isLogin, isAuthenticated, isAuthority } = require("../controllers/auth");


//params
router.param("userId", getUserById);

router.put(
    "/application/:userId",
    isLogin,
    isAuthenticated,
    apply
  );
  
module.exports = router;
