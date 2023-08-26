const authController = require("./controllers/authController");
const { ensureAuthenticated, notFound } = require("./middlewares");

module.exports = (myDataBase) => {
  const express = require("express");
  const router = express.Router();

  router.get("/", authController.renderIndexPage);

  router.post("/register",
    authController.registerUser(myDataBase),
    authController.login,
    authController.redirectToProfile
  );

  router.post("/login", authController.login, authController.redirectToProfile);
  router.get("/logout", authController.logout);
  router.get("/auth/github", authController.githubAuth);
  router.get("/auth/github/callback", authController.githubCallback);

  router.get("/profile", ensureAuthenticated, authController.renderProfilePage);
  router.get("/chat", ensureAuthenticated, authController.renderChatPage);

  router.use(notFound);

  return router;
};


// // const express = require("express");
// // const router = express.Router();
// // const authController = require("./controllers/authController");
// // const { ensureAuthenticated, notFound } = require("./middlewares");

// // // Homepage
// // router.get("/", authController.renderIndexPage);

// // // Authentication Routes
// // router.post("/register",
// //   authController.registerUser(myDataBase),
// //   authController.login,
// //   authController.redirectToProfile
// // );
// // router.post("/login", authController.login, authController.redirectToProfile);
// // router.get("/logout", authController.logout);
// // router.get("/auth/github", authController.githubAuth);
// // router.get("/auth/github/callback", authController.githubCallback);

// // // User Profile and Chat Routes (Protected Routes)
// // router.get("/profile", ensureAuthenticated, authController.renderProfilePage);
// // router.get("/chat", ensureAuthenticated, authController.renderChatPage);

// // // 404 Not Found Route
// // router.use(notFound);

// // module.exports = router;


// const authController = require("./controllers/authController");
// const { ensureAuthenticated, notFound } = require("./middlewares");

// module.exports = (app, myDataBase) => {
//   app.route("/").get(authController.renderIndexPage);

//   app.route("/register").post(
//       authController.registerUser(myDataBase),
//       authController.login,
//       authController.redirectToProfile
//     );

//   app.route("/login").post(authController.login, authController.redirectToProfile);
//   app.route("/logout").get(authController.logout);
//   app.route("/auth/github").get(authController.githubAuth);
//   app.route("/auth/github/callback").get(authController.githubCallback);
  
//   app.route("/profile").get(ensureAuthenticated, authController.renderProfilePage);
//   app.route("/chat").get(ensureAuthenticated, authController.renderChatPage);

//   app.use(notFound);

// };
