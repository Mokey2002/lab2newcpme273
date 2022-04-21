const mongoose = require("mongoose");

const Favorites = mongoose.model(
  "Favorites",
  new mongoose.Schema({
    username: String,
    itemname: String
    /*roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]*/
  })
);

module.exports = Favorites;
