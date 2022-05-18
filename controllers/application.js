const User = require("../models/user");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    req.user = user;
    next();
  });
};
exports.getUser = (req, res) => {
  //req.product.photo = undefined;
  return res.json(req.user);
};
exports.photo = (req, res, next) => {
  if (req.user.profilePhoto.data) {
    res.set("Content-Type", req.user.profilePhoto.contentType);
    return res.send(req.user.profilePhoto.data);
  }
  next();
};
exports.apply = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        message: "Application Failed!",
        status: 400,
      });
    }

    //updation code
    let user = req.user;
    user = _.extend(user, fields);

    //handling files
    console.log(file);
    if (file.profilePhoto) {
      if (file.profilePhoto.size > 100000) {
        //100 kb profilePhoto allowed only
        return res.status(400).json({
          message: "File size is too Big, maximum file size is 100kb",
          status: 400,
        });
      }
      user.profilePhoto.data = fs.readFileSync(file.profilePhoto.filepath);
      user.profilePhoto.contentType = file.profilePhoto.mimetype;
    }

    //save to db
    user.save((err, user) => {
      if (err) {
        return res.json({
          message: "Failed to saved in DB!",
          status: 400,
        });
      }
      user.applicationVerificationStatus = "1";
      user.save((err, user) => {
        if (err) {
          return res.json({
            message: "Application Failed!",
            status: 400,
          });
        }
        res.json({
          message: "Successully Submitted Application",
          status: 200,
        });
      });
    });
  });
};
