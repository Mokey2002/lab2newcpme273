const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");
const multer = require("multer");
const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
      cb(null,"./");
  },
  filename: function(req,file,cb){
      const ext = file.mimetype.split("/")[1];
      cb(null, './uploads/'+file.originalname);

  }
});
// uploads
const upload = multer({
  storage:storage
})

module.exports = function(app) {
  app.use(function(req, res, next) {
   /* res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );*/
 
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post(
    "/api/auth/signupShop",
    [
      authJwt.verifyToken
    ],
    controller.signupShop
  );

  app.post(
    "/api/auth/shopData",
    [
      authJwt.verifyToken
    ],
    controller.shopData
  );

  
  app.post(
    "/api/auth/addItem",
    upload.single('image'),
    controller.addItem
  );

  app.post(
    "/api/auth/getShopItems",
    [
      authJwt.verifyToken
    ],
    controller.getShopItems
  );

  app.post(
    "/api/auth/getAllShop",
    controller.getAllShop
  );

  app.post(
    "/api/auth/getItem",
    [
      authJwt.verifyToken
    ],
    controller.getItem
  );
  app.post(
    "/api/auth/addCart",
    [
      authJwt.verifyToken
    ],
    controller.addCart
  );

  app.post(
    "/api/auth/addFavorites",
    [
      authJwt.verifyToken
    ],
    controller.addFavorite
  );
  app.post(
    "/api/auth/getFavorites",
    [
      authJwt.verifyToken
    ],
    controller.getFavorites
  );
  app.post(
    "/api/auth/getCart",
    [
      authJwt.verifyToken
    ],
    controller.getCart
  );

  app.post(
    "/api/auth/getUser",
    [
      authJwt.verifyToken
    ],
    controller.getUser
  );

  app.post(
    "/api/auth/updateUser",
    upload.single('image'),
    controller.updateUser
  );
  app.post(
    "/api/auth/addShopping",
    [
      authJwt.verifyToken
    ],
    controller.addShopping
  );
  app.post(
    "/api/auth/getHistory",
    [
      authJwt.verifyToken
    ],
    controller.getHistory
  );
  app.post(
    "/api/auth/deleteItemShop",
    [
      authJwt.verifyToken
    ],
    controller.deleteItemShop
  );

  app.post(
    "/api/auth/getFiltered",
    [
      authJwt.verifyToken
    ],
    controller.getFiltered
  );
  app.post("/api/auth/signin", controller.signin);
};
