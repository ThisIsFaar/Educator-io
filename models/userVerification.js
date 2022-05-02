const mongoose = require("mongoose");
const { Schema } = mongoose;

const userVerification = new Schema({
  userId: {
    type: String,
    trim: true,
  },
  uniqueString: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("userVerification", userVerification);
