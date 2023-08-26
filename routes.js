const authController = require("./controllers/authController");
const { ensureAuthenticated, notFound } = require("./middlewares");

module.exports = (app, myDataBase) => {
  app.route("/").get(authController.renderIndexPage);

  app.route("/register").post(
      authController.registerUser(myDataBase),
      authController.login,
      authController.redirectToProfile
    );

  app.route("/login").post(authController.login, authController.redirectToProfile);
  app.route("/logout").get(authController.logout);
  app.route("/auth/github").get(authController.githubAuth);
  app.route("/auth/github/callback").get(authController.githubCallback);
  
  app.route("/profile").get(ensureAuthenticated, authController.renderProfilePage);
  app.route("/chat").get(ensureAuthenticated, authController.renderChatPage);

  app.use(notFound);

};
