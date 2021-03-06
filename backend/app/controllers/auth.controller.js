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
const Cart = db.cart;
const Favorite = db.favorites;
const ShopHistory = db.shopHistory;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { shopItems, shopHistory, cart, shop } = require("../models");


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

exports.deleteItemShop = (req, res) => {
  console.log("Inside deleteItemShop")
  console.log(req.body)
  console.log("Inside deleteItemShop")
  Cart.remove({
    itemname: req.body.itemname.itemname,
    username: req.body.itemname.username
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

exports.updateUser = (req, res) => {
  console.log("Inside update user")
  console.log("update user")
  upload.single("image")
  console.log(req.body)
  console.log(req.body.user)
 
  //console.log(req.headers)
  console.log("update user")
  User.updateOne({
    username: req.body.user
  },{$set:{'name':req.body.name,'email':req.body.email,'city':req.body.city,'zip':req.body.zip,'street':req.body.street,'country':req.body.country,'photolocation':req.file.originalname,'phone':req.body.phone}}).exec((err, user) => {
      console.log("first  update user data")
      console.log(user);
      console.log("first update user data")
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      return res.status(200).send({ status: 200,informacion:user });

   
    
    });
};

exports.getItem = (req, res) => {
  console.log("Inside getItem")
  console.log(req.body);
  ShopItem.find({
    itemname: req.body.itemname.itemname
  }).exec((err, user) => {
      console.log("getItem  data")
      console.log(user);
      console.log("getItem   data")
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      return res.status(200).send({ status: 200,informacion:user });

   
    
    });
};
exports.getUser = (req, res) => {
  console.log("Inside getUser")
  console.log(req.body);
  User.find({
    username: req.body.itemname.username
  }).exec((err, user) => {
      console.log("getUSER  data")
      console.log(user);
      console.log("getUser   data")
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      return res.status(200).send({ status: 200,user });

   
    
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
exports.addCart =(req, res) => {
  console.log("Add cart")

  console.log(req.body)
  console.log("add cart")
  let username = req.body.itemname.username;
  let name = req.body.itemname.itemname;
  //let price = req.body.itemname.price;
  //let quantity = req.body.quantity;


  console.log("Adding Cart")
  const cartItem = new Cart({
    username:username,
    itemname: name
   // price: price

  });
  cartItem.save((err, shop) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
  return res.status(200).send({ message: "Cart Item Added." });

};

exports.addFavorite =(req, res) => {
  console.log("Add favorite")
  console.log("Favorite")
  console.log(req.body)
  console.log("add favorite")
  let username = req.body.itemname.username;
  let name = req.body.itemname.itemname;
 
  //let quantity = req.body.quantity;


  console.log("Adding favorite")
  const FavoriteItem = new Favorite({
    username:username,
    itemname: name

  });
  FavoriteItem.save((err, shop) => {
    if (err) {
     
      console.log(err)
      res.status(500).send({ message: err });
      return;
    }
  });
  console.log("Favorite")
  return res.status(200).send({ message: "favorite Item Added." });

};

//item bought by user
exports.addShopping =(req, res) => {
  console.log("Add shopping")
  console.log(req.body)
  console.log("Add shopping")
 // let username = req.body.itemname.username;
  //let name = req.body.itemname.itemname;
 
  //let quantity = req.body.quantity;


  console.log("Adding favorite")
  for (var i= 0; i<req.body.itemname.length;i++)
{   

  const itembought = new ShopHistory({
    username: req.body.itemname[i].username,
    shopname: req.body.itemname[i].shopname,
    itemname: req.body.itemname[i].itemname,
    category: req.body.itemname[i].category,
    description : req.body.itemname[i].description,
    price  : req.body.itemname[i].price,
    quantity: req.body.itemname[i].quantity,
    photolocation: req.body.itemname[i].photolocation,
    gift: req.body.itemname[i].gift,
    id: req.body.itemname[i]._id,
    note:req.body.itemname[i].note

  });
  itembought.save((err, shop) => {
    if (err) {
     
      console.log(err)
      res.status(500).send({ message: err });
      return;
    }
  });

}
 


  setTimeout(function(){

    Cart.remove({
      username: req.body.itemname[0].username
    }).exec((err, user) => {
        console.log("first result  data")
        console.log(user);
        console.log("first result   data")
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        //return res.status(200).send({ status: 200,informacion:user });
    
     
      
      });
    console.log("added to bought database")
    return res.status(200).send({ message: "ITtem bought ." });;
}, 3000);


};

exports.getFavorites =(req, res) => {
  console.log("get favorite")
  console.log("")
  console.log(req.body)
  console.log("get favorite")
  let username = req.body.itemname.username;
  let name = req.body.itemname.itemname;
 
  //let quantity = req.body.quantity;

  Favorite.find({
    username:username
   // itemname: 
  }).exec((err, items) => {
      console.log("getfavoirtes  data")
      console.log(items);
      console.log("getfavoirtes   data")
      if (err && (!res.headersSent)) {
        res.status(500).send({ message: err });
        return;
      }
      
      var allitems=[]
for (var j = 0; j < items.length; j++){

  shopItems.find({
    //username:username
    itemname: items[j].itemname
  }).exec((err, itemsfromshop)=> {
    if (err && (!res.headersSent)) {
      res.status(500).send({ message: err });
      return;
    }
    for (var i = 0; i < itemsfromshop.length; i++){
      console.log(itemsfromshop)
      allitems.push(itemsfromshop[i]);
    }

  
  });


   // itemnames.push(items[j].itemname);
   // console.log(items[j].itemname);
  }


  setTimeout(function(){
    console.log("allitems")
    console.log(allitems)
    console.log("allitems")
    return res.status(200).send({ status: 200,informacion:allitems });
}, 2000);
     // return res.status(200).send({ status: 200,informacion:allitems });

   
    
    });
 // return res.status(200).send({ message: "favorite Item Added." });

};
//get purchasing history
exports.getHistory =(req, res) => {
  console.log("get history")
  console.log("")
  console.log(req.body)
  console.log("get history")
  let username = req.body.itemname.username;


  //let quantity = req.body.quantity;

  shopHistory.find({
    username:username
   // itemname: 
  }).exec((err, items) => {
      console.log("getItem  data")
      console.log(items);
      console.log("getItem   data")
      if (err && (!res.headersSent)) {
        res.status(500).send({ message: err });
        return;
      }
      

  setTimeout(function(){
    console.log("allitems")
    console.log(items)
    console.log("allitems")
    return res.status(200).send({ status: 200,informacion:items });
}, 2000);
     // return res.status(200).send({ status: 200,informacion:allitems });

   
    
    });
 // return res.status(200).send({ message: "favorite Item Added." });

};



//get purchasing history
exports.getFiltered =(req, res) => {
  console.log("get history")
  console.log("")
  console.log(req.body)
  let itemnombre = req.body.itemname.term;
  console.log(itemnombre)
  console.log("get history")
  

  //let quantity = req.body.quantity;

  ShopItem.find({
    itemname:itemnombre
   // itemname: 
  }).exec((err, items) => {
      console.log("getItem  data")
      console.log(items);
      console.log("getItem   data")
      if (err && (!res.headersSent)) {
        res.status(500).send({ message: err });
        return;
      }
      

  setTimeout(function(){
    console.log("allitems")
    console.log(items)
    console.log("allitems")
    return res.status(200).send({ status: 200,informacion:items });
}, 2000);
     // return res.status(200).send({ status: 200,informacion:allitems });

   
    
    });
 // return res.status(200).send({ message: "favorite Item Added." });

};

exports.getCart =(req, res) => {
  console.log("get cart")
  console.log("")
  console.log(req.body)
  console.log("get cart")
  let username = req.body.itemname.username;
  let name = req.body.itemname.itemname;
 
  //let quantity = req.body.quantity;

  Cart.find({
    username:username
   // itemname: 
  }).exec((err, items) => {
      console.log("getItem  data")
      console.log(items);
      console.log("getItem   data")
      if (err && (!res.headersSent)) {
        res.status(500).send({ message: err });
        return;
      }
      
      var allitems=[]
for (var j = 0; j < items.length; j++){

  shopItems.find({
    //username:username
    itemname: items[j].itemname
  }).exec((err, itemsfromshop)=> {
    if (err && (!res.headersSent)) {
      res.status(500).send({ message: err });
      return;
    }
    for (var i = 0; i < itemsfromshop.length; i++){
      console.log(itemsfromshop)
      allitems.push(itemsfromshop[i]);
    }

  
  });


   // itemnames.push(items[j].itemname);
   // console.log(items[j].itemname);
  }


  setTimeout(function(){
    console.log("allitems")
    console.log(allitems)
    console.log("allitems")
    return res.status(200).send({ status: 200,informacion:allitems });
}, 2000);
     // return res.status(200).send({ status: 200,informacion:allitems });

   
    
    });
 // return res.status(200).send({ message: "favorite Item Added." });

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
