const mongoose = require("mongoose");

const ShopItems = mongoose.model(
  "ShopItems",
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

module.exports = ShopItems;
