const mongoose = require("mongoose");

const Shop = mongoose.model(
  "Shop",
  new mongoose.Schema({
    username: String,
    shopname: String,
    itemname: String,
    category: String,
    description : String,
    price  : String,
    quantity: String,
    photolocation: String
    /*roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]*/
  })
);

module.exports = Shop;
