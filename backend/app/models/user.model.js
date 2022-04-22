const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    name:String,
    email: String,
    password: String,
    city: String,
    age : String,
    zip : String,
    street: String,
    country:String,
    phone:String,
    photolocation: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
