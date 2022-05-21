var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  apply,
  getUserById,
  getUser,
  photo,
  updateReq,
  acceptUpdateReq,
  rejectUpdateReq,
} = require("../controllers/application");
const {
  isLogin,
  isAuthenticated,
  isAuthority,
} = require("../controllers/auth");

//Get User By Id Parameter
router.param("userId", getUserById);

//Submitting Form, updating user details
router.put("/application/:userId", isLogin, isAuthenticated, apply);
router.get("/application/profile/:userId", isLogin, isAuthenticated, getUser);
router.get("/application/photo/:userId", photo);
router.post("/update-req/:userId", isLogin, isAuthenticated, updateReq);

router.post(
  "/update-req/accept/:userId",
  isLogin,
  isAuthenticated,
  acceptUpdateReq

);
router.post(
  "/update-req/reject/:userId",
  isLogin,
  isAuthenticated,
  rejectUpdateReq
);

module.exports = router;
