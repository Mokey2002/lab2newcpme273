const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.cart = require("./cart.model");
db.favorites = require("./favorites.model");
db.shop = require("./shop.model");


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;