const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  password: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.model("User", userSchema);
