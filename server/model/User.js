const mongoose = require("mongoose");

// this is schema for the user collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// this create a user model based on the userSchema
// we are just assigning this to a variable User for easy export
const User = mongoose.model("User", userSchema);
module.exports = User;
