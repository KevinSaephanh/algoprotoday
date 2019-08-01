const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 15,
    required: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 7,
    maxlength: 50,
    required: true
  },
  password: {
    type: String,
    minlength: 7,
    maxlength: 255,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean
  }
});

module.exports = mongoose.model("User", UserSchema);
