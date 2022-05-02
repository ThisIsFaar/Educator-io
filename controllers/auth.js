const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      email: user.email,
      password: user.password,
    });
  });
};
