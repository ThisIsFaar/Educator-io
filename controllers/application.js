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

exports.apply = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to apply...",
      });
    }

    //updation code
    let user = req.user;
    user = _.extend(user, fields);

    //handling files
    if (file.profilePhoto) {
      if (file.profilePhoto.size > 100000) {
        //100 kb profilePhoto allowed only
        return res.status(400).json({
          error: "File size is too Big, maximum file size is 100kb",
        });
      }
      console.log(file.profilePhoto.type);
      user.profilePhoto.data = fs.readFileSync(file.profilePhoto.filepath);
      user.profilePhoto.contentType = file.profilePhoto.mimetype;
    }

    //save to db
    user.save((err, user) => {
      if (err) {
        return res.json({
          error: "application failed",
        });
      }
      user.applicationVerificationStatus = "1";
      user.save((err, user) => {
        if (err) {
          return res.json({
            error: "application failed",
          });
        }
        res.json(user);
      });
    });
  });
};
