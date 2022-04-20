const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    username:String,
    itemname: String,
    price: String,
    quantity:String
  })
);

module.exports = Cart;
