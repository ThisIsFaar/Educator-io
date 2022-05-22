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
    unique: true,
  },
  encry_password: {
    type: String,
  },
  salt: String,
  verified: {
    type: Boolean,
    default: false,
  }, //account email verification status
  otp: {
    type: String,
    trim: true,
  },
  otpExpiry: {
    type: Date,
  },
  phoneNumber: {
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
    enum: ["0", "1", "2", "4"],
    // application verification status: 0,1,2,3, 4x
    // 0: account created, not submitted application form
    // 1: application submitted for verification
    // 2: application verify
    // 4: application rejected
  },
  // yearOfSelection: {
  //   type: String,
  //   trim: true,
  // },
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
  profilePhoto: {
    data: Buffer,
    contentType: String,
  },
  authority: {
    type: Boolean,
    default: false,
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
