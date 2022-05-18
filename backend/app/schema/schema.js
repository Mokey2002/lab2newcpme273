const graphql = require('graphql');
const { addShop, addFavorites } = require('../../../frontend/src/mutation/mutations');
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


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;






const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        passwrod:{ type: GraphQLString },
        city:{ type: GraphQLString },
        age: { type: GraphQLInt }
    })
});
const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        description: { type: GraphQLString },
        quantity:{ type: GraphQLString },
        category:{ type: GraphQLString }
    })
});
const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLInt }
    
    })
});
const PurchasesType = new GraphQLObjectType({
    name: 'Purchases',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      price: { type: GraphQLString },
      description: { type: GraphQLString },
      quantity:{ type: GraphQLString },
      category:{ type: GraphQLString }
    })
});
const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      price: { type: GraphQLString },
      description: { type: GraphQLString },
      quantity:{ type: GraphQLString },
      category:{ type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id === args.id );
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addItem: {
            type: ItemType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                price: { type: GraphQLString },
                description: { type: GraphQLString },
                quantity:{ type: GraphQLString },
                category:{ type: GraphQLString }
            },
            resolve(args, res) {
               
                    console.log("Add Item")
                    upload.single("image")
                    console.log(args)
                    console.log(args)
                    console.log("Additem")
                    let username = args.username;
                    let name = args.itemname;
                    let category = args.category;
                    let description =.body.description;
                    let price = args.price;
                    let quantity = args.quantity;
                    let sname=args.shopname
                  
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
                  
                 
            }
        },

        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                console.log("inside signup")
                console.log(args)
                console.log("inside signup")
                const user = new User({
                  username: args.body.username,
                  email: args.body.email,
                  password: bcrypt.hashSync(args.password, 8),
                  city: args.body.city,
                  age :  args.body.age,
                  zip :  args.body.zip,
                  street:  args.body.street
              
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
            }
        },

        addShop: {
            type: StoreType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                username: {type: GraphQLString}
            },
            resolve(parent, args) {
                exports.signupShop = (args, res) => {
                    ShopItem.findOne({
                      shopname: args.shopname
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
                            username: args.username,
                            shopname: args.shopname
                        
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
            }
        },

        addFavorites: {
            type: ItemType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                username: {type: GraphQLString}
            },
            resolve(parent, args) {
            
                    console.log("Add favorite")
                    console.log("Favorite")
                 
                    console.log("add favorite")
                    let username = args.username;
                    let name = args.itemname;
                   
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
                  
                 
            }
        },

        addCart: {
            type: ItemType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                price: { type: GraphQLString },
                description: { type: GraphQLString },
                quantity:{ type: GraphQLString },
                category:{ type: GraphQLString },
                username: {type: GraphQLString}
            },
            resolve(parent, args) {
                const cartItem = new Cart({
                    username:args.username,
                    itemname:args.name
                   // price: price
                
                  });
                  cartItem.save((err, shop) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                  });
                  return res.status(200).send({ message: "Cart Item Added." });
            }
        }

    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;