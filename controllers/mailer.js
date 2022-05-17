const UserVerification = require("../models/userVerification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const confirmEmail = require("./helpers/confirmEmail.js")
const resetEmail = require("./helpers/resetPass.js")
const otpEmail = require("./helpers/otpAuth")



//nodemailer stuff
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("NodeMailer Transporter connected ✅");
  }
});

exports.sendVerificationEmail = ({ _id, email, authority, verified }, res) => {
  const URL = "http://localhost:5000/";
  var mailOptions = {};
  if (authority) {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "[Educator.io] AUTHORITY OTP FOR LOGIN",
      html: otpEmail(otp)
    };

    const saltRounds = 10;
    bcrypt.hash(otp, saltRounds).then((hashotp) => {
      //fetching user by email
      User.findOne({email: email}).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "No user found",
          });
        } else {

          let otpUser = user;
          otpUser.otp = hashotp;
          otpUser.otpExpiry = Date.now() + 300000;

          
          otpUser.save()
            .then(() => {
              
              transporter.sendMail(mailOptions);
              res.json({
                msg: "Otp sent succesfully on mail ✅",
                status: 200,
                userId: otpUser._id,
                authority: otpUser.authority
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: 500,
                msg: "could not send OTP",
              });
            });
        }
      });
    });
  } else {
    const uniqueString = uuidv4() + _id;
    

    if (verified === false) {
      let verurl =  `${URL + "api/verify/" + _id + "/" + uniqueString}`;
      mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "[Educator.io] Verify Your Email Now",
        html: confirmEmail(verurl)
      };      
    } else {
      let resurl = `${URL + "api/resetForm/" + _id + "/" + uniqueString}`;
      mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "[Educator.io] Reset Your Password Now",
        html: resetEmail(resurl)
      };    
    }

    const saltRounds = 10;
    bcrypt.hash(uniqueString, saltRounds).then((hashUniqueString) => {
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 900,
      });

      newVerification
        .save()
        .then(() => {
          transporter.sendMail(mailOptions);
          // res.json({
          //   msg: "Mail sent succesfully ✅",
          // });
          console.log("Mail sent succesfully ✅");
        })
        .catch((err) => {
          console.log(err);
          // res.json({
          //   status: "failed",
          //   msg: "could not send verification email",
          // });
        });
    });
  }
};
