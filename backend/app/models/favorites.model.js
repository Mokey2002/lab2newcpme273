const mongoose = require("mongoose");

const Favorites = mongoose.model(
  "Favorites",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    city: String,
    age : String,
    zip : String,
    street: String,
    photolocation: String
    /*roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]*/
  })
);

module.exports = Favorites;
