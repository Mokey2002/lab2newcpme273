const mongoose = require("mongoose");

const ShopHistory = mongoose.model(
  "ShopHistory",
  new mongoose.Schema({
    username: String,
    shopname: String,
    itemname: String,
    category: String,
    description : String,
    price  : String,
    quantity: String,
    photolocation: String,
    gift: String,
    id: String,
    /*roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]*/
  })
);

module.exports = ShopHistory;
