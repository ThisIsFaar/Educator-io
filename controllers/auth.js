const User = require("../models/user");
const UserVerification = require("../models/userVerification");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("./mailer");

exports.register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].params,
    });
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }

    sendVerificationEmail(user, res);

    res.json({
      email: user.email,
      encry_password: user.encry_password
    });
  });
};

exports.login = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user with this email does not exists",
      });
    }

    if (!user.verified) {
      res.status(401).json({
        error: "user email is not verified",
      });
    }

    if (!user.authenticate(password)) {
      res.status(401).json({
        error: "email and password is no matched",
      });
    } else {

      const { _id, email, authority } = user;      
      
      if (authority) {
        sendVerificationEmail(user, res);
      } else {
              //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
      
      //send response to front end

      return res.json({ token, user: { _id, email }, authority: authority });
      }

    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User logout succesfully",
  });
};

exports.verify = (req, res) => {
  let { userId, uniqueString } = req.params;

  UserVerification.find({ userId })
    .then((res) => {
      if (res.length > 0) {
        const { expiresAt } = res[0];
        const hashUniqueString = res[0].uniqueString;

        if (expiresAt < Date.now) {
          UserVerification({ userId })
            .then((res) => {
              User.deleteOne({ _id: user_id })
                .then(() => {
                  let message = "Link has expired please sign again";
                  res.redirect(`/api/verified/error=true&message=${message}`);
                })
                .catch((err) => {
                  let message = "clearing user with expired string failed";
                  res.redirect(`/api/verified/error=true&message=${message}`);
                });
            })
            .catch((err) => {
              let message = "err occur while deleteding reocrd";
              res.redirect(`/api/verified/error=true&message=${message}`);
            });
        } else {
          //valid result record? validating it
          //first compare the hashed string
          bcrypt
            .compare(uniqueString, hashUniqueString)
            .then((res) => {
              if (res) {
                User.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerification.deleteOne({ userId }).then(() => {
                      console.log("SUCCESSFULLY VERIFIED");
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                let message = "Invalid details ";
                res.redirect(`/api/verified/error=true&message=${message}`);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        let message =
          "details does not exist or already verified";
        res.redirect(`/api/verified/error=true&message=${message}`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = "no record found with your provided details";
      res.redirect(`/api/verified/error=true&message=${message}`);
    });
};

exports.verifyOtp = (req, resp) => {
  let { userId, otp } = req.params;

  User.findOne({ _id:  userId })
    .then((res) => {
      if (res) {
        const { otpExpiry } = res;
        const hashotp = res.otp;
        if (hashotp == "0") {
          return resp.json({
            msg:"otp invalid or already used"
          })
        }
        if (otpExpiry < Date.now()) {
          let message = "OTP is expired, resend and verify";
          resp.json({
            msg: message
          })
        } else {
          //valid result record? validating it
          //first compare the hashed string
          bcrypt
          .compare(otp, hashotp)
          .then((status) => {
            if (status) {

              //turning otp to 0
              User.findOne({_id: res.id}).then(updateOtpToNull=>{
                updateOtpToNull.otp = "0";
                updateOtpToNull.save()
              })

              //create token
              const token = jwt.sign({ _id: res.id }, process.env.SECRET);
              
              //put token in cookie
              resp.cookie("token", token, { expire: new Date() + 9999 });
              
              //send response to front end
              
              return resp.json({ token, user: { id: res.id, email : res.email}, authority: res.authority });

              } else {
                let message = "Invalid OTP ";
                // resp.redirect(`/api/verified/error=true&message=${message}`);
                resp.json({
                  msg: message
                })
              }
            })
        }
      }
    })
    .catch((err) => {
      console.log(err);
      let message = "no record found with your provided details";
      // res.redirect(`/api/verified/error=true&message=${message}`);
      resp.json({
        msg: message
      })
    });
};

exports.verified = (req, res) => {
  res.send({
    status: "success",
    mesg: "done",
    paramDetails: req.params
  });
};

exports.isLogin = expressJwt({
  secret: process.env.SECRET,
  requestProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.user && req.auth && req.user._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAuthority = (req, res, next) => {
  if (!req.user.authority) {
    return res.status(403).json({
      error: "your are not ADMIN,chal nikal ab",
    });
  }
  next();
};

exports.resetPassword = (req,res) => {
  const { email } = req.params;
  User.findOne({email: email})
  .then(user => {
    if (user && user.verified) {
      res.json({user});
      sendVerificationEmail(user, res)
    } else {
      res.json({
        msg:"no user found"
      })
    }
  })
}

exports.resetForm = (req, res) => {
  let { userId, uniqueString } = req.params;

  UserVerification.find({ userId })
    .then((res) => {
      if (res.length > 0) {
        const { expiresAt } = res[0];
        const hashUniqueString = res[0].uniqueString;

        if (expiresAt < Date.now) {
          UserVerification({ userId })
            .then((res) => {
              User.deleteOne({ _id: user_id })
                .then(() => {
                  let message = "Link has expired please sign again";
                  res.redirect(`/api/verified/error=true&message=${message}`);
                })
                .catch((err) => {
                  let message = "clearing user with expired string failed";
                  res.redirect(`/api/verified/error=true&message=${message}`);
                });
            })
            .catch((err) => {
              let message = "err occur while deleteding reocrd";
              res.redirect(`/api/verified/error=true&message=${message}`);
            });
        } else {
          //valid result record? validating it
          //first compare the hashed string
          bcrypt
            .compare(uniqueString, hashUniqueString)
            .then((res) => {
              if (res) {
                User.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerification.deleteOne({ userId }).then(() => {
                      console.log("OPEN FORM");

                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                let message = "Invalid details ";
                res.redirect(`/api/verified/error=true&message=${message}`);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        let message =
          "details does not exist or already verified";
        res.redirect(`/api/verified/error=true&message=${message}`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = "no record found with your provided details";
      res.redirect(`/api/verified/error=true&message=${message}`);
    });
};

exports.resetFormSubmit = ((req,res) => {
  console.log("ter happy bdday manayege");
})