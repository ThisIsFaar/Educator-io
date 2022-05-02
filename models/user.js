const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema({
  Name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,
  phoneNumber: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  fatherName: {
    type: String,
    trim: true,
  },
  motherName: {
    type: String,
    trim: true,
  },
  spouseName: {
    type: String,
    trim: true,
  },
  DOB: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  applicationVerificationStatus: {
    type: String,
    default: "0",
    enum: ["0", "1", "2", "3", "41", "42", "43"],
    // application verification status: 0,1,2,3, 4x
    // 0: not applied yet
    // 1: verify by 1st level
    // 2: verify by 2nd level
    // 3: verify by 3rd level
    // 4x: rejected by x level
  },
  yearOfSelection: {
    type: String,
    trim: true,
  },
  dateOfJoining: {
    type: String,
    trim: true,
  },
  postedSchoolName: {
    type: String,
    trim: true,
  },
  postedDesignationName: {
    type: String,
    trim: true,
  },
  currentDesignationPost: {
    type: String,
    trim: true,
  },
  postedSchoolLocation: {
    type: String,
    trim: true,
  },
  retirementYear: {
    type: String,
    trim: true,
  },
  //   newSchoolLocationPosting: {
  //     type: String,
  //     trim: true,
  //   },
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
