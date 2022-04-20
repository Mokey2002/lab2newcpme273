const config = require("../config/auth.config");
const db = require("../models");
const multer = require("multer");
const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
      cb(null,".");
  },
  filename: function(req,file,cb){
    console.log(file)
      const ext = file.mimetype.split("/")[1];
      cb(null, file.originalname);

  }
});
// uploads
const upload = multer({
  storage:storage
})
const User = db.user;
const Role = db.role;
const Shop = db.shop;
const ShopItem = db.shopItems;


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
  ShopItem.findOne({
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
        const shop = new ShopItem({
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

exports.shopData = (req, res) => {
  console.log("Inside shopdata")
  console.log(req.body.shopname)
  console.log(req.body.username)
  console.log("Inside shopdata")
  Shop.findOne({
    shopname: req.body.shopname,
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      console.log("first result  data")
      console.log(user);
      console.log("first result   data")
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        Shop.find({shopname:req.body.shopname}).exec(function(err, result) {
          console.log("username + shopname not found--returning all shopitmes owner-false ")
          if (err) throw err;
          console.log(result);
          console.log("username + shopname not found--returning all shopitmes owner-false ")
          return res.status(201).send({ status: 201, informacion:result });
        });
      }else{

        Shop.find({shopname:req.body.shopname}).exec(function(err, result) {
          console.log("username + shopname  found--returning all shopitmes owner-true ")
          if (err) throw err;
          console.log(result);
          console.log("username + shopname  found--returning all shopitmes owner-true ")
          return res.status(200).send({ status: 200,informacion:result });
        });
        
      }
    
    });
};
exports.getShopItems = (req, res) => {
  console.log("Inside shopdata")
  console.log(req.body.shopname)
  console.log(req.body.username)
  console.log("Inside shopdata")
  ShopItem.find({
    shopname: req.body.shopname,
    username: req.body.username
  }).exec((err, user) => {
      console.log("first result  data")
      console.log(user);
      console.log("first result   data")
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        ShopItem.find({shopname:req.body.shopname}).exec(function(err, result) {
          console.log("username + shopname not found--returning all shopitmes owner-false ")
          if (err) throw err;
          console.log(result);
          console.log("username + shopname not found--returning all shopitmes owner-false ")
          return res.status(201).send({ status: 201, informacion:result });
        });
      }else{

        ShopItem.find({shopname:req.body.shopname}).exec(function(err, result) {
          console.log("username + shopname  found--returning all shopitmes owner-true ")
          if (err) throw err;
          console.log(result);
          console.log("username + shopname  found--returning all shopitmes owner-true ")
          return res.status(200).send({ status: 200,informacion:result });
        });
        
      }
    
    });
};
exports.getAllShop = (req, res) => {
  console.log("Inside getAllshop")

  ShopItem.find({
    itemname: {$ne : null}
  }).exec((err, user) => {
      console.log("first result  data")
      console.log(user);
      console.log("first result   data")
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      return res.status(200).send({ status: 200,informacion:user });

   
    
    });
};
exports.addItem =(req, res) => {
  console.log("Add Item")
  upload.single("image")
  console.log(req.body)
  console.log(req.headers)
  console.log("Additem")
  let username = req.body.username;
  let name = req.body.itemname;
  let category = req.body.category;
  let description = req.body.description;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let sname=req.body.shopname

  console.log("Adding shop")
  const shopitem = new ShopItem({
    username: username,
    shopname: sname,
    itemname: name,
    category: category,
    description : description,
    price  : price,
    quantity: quantity,
    photolocation:req.file.originalname

  });
  shopitem.save((err, shop) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } 
  });
  return res.status(200).send({ message: "Shop Item Added." });

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
