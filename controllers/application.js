const User = require("../models/user");

const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { json } = require("express/lib/response");

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

const Update = require("../models/update");

exports.updateReq = (req, res )=> {

  Update.deleteMany({userId: req.user._id}).then((done)=>{
    console.log(done);
  }).catch((err)=>{
    console.log(err);
  })



  const update = new Update({
    user: req.user,
    userId: req.user._id,
    phoneNumber: req.body.phoneNumber,
    dateOfJoining: req.body.dateOfJoining,
    postedSchoolName: req.body.postedSchoolName,
    postedDesignationName: req.body.postedDesignation,
    postedSchoolLocation: req.body.postedSchoolLocation,
    address: req.body.address,
    message: req.body.message,
  });

  update
  .save()
  .then(() => {
    res.json({
      message: "Update request submitted!",
      status: 200,
    });

  })
  .catch((err) => {
     console.log("ERROR");
  });
};


exports.acceptUpdateReq = (req, res )=> {

  let user = {}
  if (req.body.phoneNumber !== undefined ) {
    user.phoneNumber = req.body.phoneNumber
  }
  if (req.body.dateOfJoining !== undefined ) {
    user.dateOfJoining = req.body.dateOfJoining
  }
  if (req.body.postedDesignationName !== undefined ) {
    user.postedDesignationName = req.body.postedDesignationName
  }
  if (req.body.postedSchoolLocation !== undefined ) {
    user.postedSchoolLocation = req.body.postedSchoolLocation
  }
  if (req.body.postedSchoolName !== undefined ) {
    user.postedSchoolName = req.body.postedSchoolName
  }
  if (req.body.address !== undefined ) {
    user.address = req.body.address
  }
  console.log(req.body);


  User.findOneAndUpdate({_id: req.body.userId}, user, {new: true}, ( err, done) => {
    Update.deleteMany({userId: req.body.userId}, (err, done)=> {
      if (err) {
        res.json({
          status: 400,
          message: "Failed to Update"
        })
      }
      res.json({
        status: 200,
        message: "Successfully Accepted Updated"
      })
    })
  } )
};


exports.rejectUpdateReq = (req, res )=> {


  Update.deleteMany({userId: req.body.userId}, (err, done)=> {
    if (err) {
      res.json({
        status: 400,
        message: "Failed to Reject"
      })
    }
    res.json({
      status: 200,
      message: "Successfully Rejected"
    })
  })

};