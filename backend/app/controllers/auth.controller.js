const config = require("../config/auth.config");
const db = require("../models");

const User = db.user;
const Role = db.role;
const Shop = db.shop;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  console.log("inside signup")
  console.log(req.body)
  console.log("inside signup")
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    city: req.body.city,
    age :  req.body.age,
    zip :  req.body.zip,
    street:  req.body.street

  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
exports.signupShop = (req, res) => {
  Shop.findOne({
    shopname: req.body.shopname
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      console.log("shop  signup")
      console.log(user);
      console.log("shop  signup")
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        console.log("Adding shop")
        const shop = new Shop({
          username: req.body.username,
          shopname: req.body.shopname
      
        });
        shop.save((err, shop) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          } 
        });
        return res.status(200).send({ message: "Shop Created." });
      }
      res.status(500).send({message :"Shopname already taken"});
    });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      console.log("inside signin")
      console.log(user);
      console.log("inside signin")
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

     // for (let i = 0; i < user.roles.length; i++) {
     //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
     // }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};
