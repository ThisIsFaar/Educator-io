const User = require('../models/user');
const UserVerification = require('../models/userVerification');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require('./mailer');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const user = require('../models/user');
const update = require('../models/update');

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
    password: req.body.password,
  });
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        message: 'User Already Exist',
        status: 400,
      });
    }

    sendVerificationEmail(user, res);

    res.json({
      email: user.email,
      encry_password: user.encry_password,
      status: 200,
      message: 'Successfully Sent Verification Email',
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
        message: 'User With This Email Does Not Exists',
        status: 400,
      });
    }

    if (!user.verified) {
      res.status(401).json({
        error: 'User Email Is Not Verified',
        status: 400,
      });
    }

    if (!user.authenticate(password)) {
      res.status(401).json({
        message: 'Email, Password Does Not Matched',
        status: 400,
      });
    } else {
      const { _id, email, authority } = user;

      if (authority) {
        sendVerificationEmail(user, res);
      } else {
        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie('token', token, { expire: new Date() + 9999 });

        //send response to front end

        return res.json({
          token,
          user: { _id, email },
          authority: authority,
          status: 200,
        });
      }
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'User Logout Succesfully',
  });
};

exports.verify = (req, resp) => {
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
                  let message = 'Link has expired please sign again';
                  res.redirect(`/api/verified/error=true&message=${message}`);
                })
                .catch((err) => {
                  let message = 'clearing user with expired string failed';
                  res.redirect(`/api/verified/error=true&message=${message}`);
                });
            })
            .catch((err) => {
              let message = 'err occur while deleteding reocrd';
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
                      // console.log("SUCCESSFULLY VERIFIED");
                      // resp.json({
                      //   message: 'SUCCESSFULLY VERIFIED'
                      // })
                      resp.redirect(
                        `${process.env.FRONTEND_URL}/login?status=verified`
                      );
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                let message = 'Invalid details ';
                resp.redirect(`${process.env.FRONTEND_URL}/login?status=error`);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        let message = 'details does not exist or already verified';
        resp.redirect(`${process.env.FRONTEND_URL}/login?status=error`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = 'no record found with your provided details';
      res.redirect(`${process.env.FRONTEND_URL}/login?status=error`);
    });
};

exports.verifyOtp = (req, res) => {
  let { userId, otp } = req.params;
  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        const { otpExpiry } = user;
        const hashotp = user.otp;
        if (hashotp == '0') {
          res.json({
            message: 'Otp Invalid Or Already Used',
            status: 400,
          });
        }
        if (otpExpiry < Date.now()) {
          res.json({
            message: 'OTP Is Expired, Login Again',
            status: 400,
          });
        } else {
          //valid result record? validating it
          //first compare the hashed string
          bcrypt.compare(otp, hashotp).then((status) => {
            if (status) {
              //turning otp to 0
              User.findOne({ _id: user.id }).then((updateOtpToNull) => {
                updateOtpToNull.otp = '0';
                updateOtpToNull.save();
              });
              //create token
              const token = jwt.sign({ _id: user._id }, process.env.SECRET);

              //put token in cookie
              res.cookie('token', token, { expire: new Date() + 9999 });

              //send response to front end

              return res.json({
                token,
                user: { id: user.id, email: user.email },
                authority: user.authority,
                status: 200,
              });
            } else {
              res.json({
                message: 'Invalid OTP',
                status: 400,
              });
            }
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      let message = 'no record found with your provided details';
      // res.redirect(`/api/verified/error=true&message=${message}`);
      res.json({
        msg: message,
      });
    });
};

exports.verified = (req, res) => {
  res.send({
    status: 'success',
    mesg: 'done',
    paramDetails: req.params,
  });
};

exports.isLogin = expressJwt({
  secret: process.env.SECRET,
  requestProperty: 'auth',
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.user && req.auth && req.user._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAuthority = (req, res, next) => {
  if (!req.user.authority) {
    return res.status(403).json({
      error: 'your are not authority',
    });
  }
  next();
};

exports.resetPassword = (req, res) => {
  const { email } = req.params;
  User.findOne({ email: email }).then((user) => {
    if (user && user.verified) {
      sendVerificationEmail(user, res);
      res.json({
        message: 'Reset Password Mail sent succesfully',
        status: 200,
      });
    } else {
      res.json({
        message: 'no user found with with email',
        status: 400,
      });
    }
  });
};

exports.resetForm = (req, res) => {
  let { userId, uniqueString } = req.params;
  UserVerification.find({ userId })
    .then((user) => {
      if (user.length > 0) {
        const { expiresAt } = user[0];
        const hashUniqueString = user[0].uniqueString;

        if (expiresAt < Date.now) {
          UserVerification({ userId })
            .then(() => {
              User.deleteMany({ _id: user_id })
                .then(() => {
                  let message = 'Link has expired please sign again';
                  res.redirect(`/api/verified/error=true&message=${message}`);
                })
                .catch((err) => {
                  let message = 'clearing user with expired string failed';
                  res.redirect(`/api/verified/error=true&message=${message}`);
                });
            })
            .catch((err) => {
              let message = 'err occur while deleteding reocrd';
              res.redirect(`/api/verified/error=true&message=${message}`);
            });
        } else {
          //valid result record? validating it
          //first compare the hashed string
          bcrypt
            .compare(uniqueString, hashUniqueString)
            .then((data) => {
              if (data) {
                User.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerification.deleteMany({ userId }).then(() => {
                      res.redirect(
                        `${process.env.FRONTEND_URL}/reset-password-form/?id=${userId}`
                      );
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                User.deleteMany({ _id: user_id });
                let message = 'Invalid details ';
                res.redirect(`/api/verified/error=true&message=${message}`);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        let message = 'details does not exist or already verified';
        res.redirect(`/api/verified/error=true&message=${message}`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = 'no record found with your provided details';
      res.redirect(`/api/verified/error=true&message=${message}`);
    });
};

exports.resetFormSubmit = (req, res) => {
  const { userId, password } = req.params;

  User.findOne({ _id: userId }).then((user) => {
    user.encry_password = user.securePassword(password);
    user
      .save()
      .then(() => {
        res.json({
          message: 'Your Password Succesfully Updated',
          status: 200,
        });
      })
      .catch((err) => {
        res.json({
          message: "Can't Update Your Password",
          status: 400,
        });
      });
  });
};

exports.getAllRecords = (req, res) => {
  user
    .find({
      authority: 'false',
      applicationVerificationStatus: '2',
      verified: 'true',
    })
    .then(function (users) {
      res.send(users);
    });
};
exports.getAllupdateRequest = (req, res) => {
  update.find({ verifyStatus: false }).then(function (users) {
    res.send(users);
  });
};

exports.getRecordForVerify = (req, res) => {
  user
    .find({
      authority: 'false',
      applicationVerificationStatus: '1',
    })
    .then(function (users) {
      res.send(users);
    });
};

exports.updateUserVerification = (req, res) => {
  console.log(req.user._id);
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { applicationVerificationStatus: '2' } },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'you r not auth. to update',
        });
      }
      res.json(user);
    }
  );
};
exports.rejectUserVerification = (req, res) => {
  console.log(req.user._id);
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { applicationVerificationStatus: '4' } },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'you r not auth. to update',
        });
      }
      res.json(user);
    }
  );
};
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user found',
      });
    }
    req.user = user;
    next();
  });
};
