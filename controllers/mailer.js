const UserVerification = require("../models/userVerification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const bcrypt = require("bcrypt");

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
    console.log("check");
    console.log(err);
  } else {
    console.log("NodeMailer Transporter connected ✅");
  }
});

exports.sendVerificationEmail = ({ _id, email }, res) => {
  const URL = "http://localhost:5000/";
  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "verify your email",
    html: `verify <a href=${
      URL + "api/verify/" + _id + "/" + uniqueString
    }>herre</a>`,
  };

  const saltRounds = 0;
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
        console.log("DONE");
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "failed",
          msg: "could not save verification email data",
        });
      });
  });
};
