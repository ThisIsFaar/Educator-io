const mongoose = require("mongoose");
const { Schema } = mongoose;

const userUpdate = new Schema({
  user: {
    type: Object,
    trim: true,
  },
  userId:{
    type: String,
    trim: true,
  },
  verifyStatus: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  dateOfJoining: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  message: {
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
  postedSchoolLocation: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("userUpdate", userUpdate);
