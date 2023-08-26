const passport = require("passport");
const bcrypt = require("bcrypt");

const renderIndexPage = (req, res) => {
  res.render("index", {
    title: "Connected to Database",
    message: "Please log in",
    showLogin: true,
    showRegistration: true,
    showSocialAuth: true,
  });
};

const renderProfilePage = (req, res) => res.render("profile", { username: req.user.username });
const renderChatPage = (req, res) => res.render("chat", { user: req.user });

const redirectToProfile = (req, res) => res.redirect("/profile");

const registerUser = (myDataBase) => (req, res, next) => {
  myDataBase.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      next(err);
    } else if (user) {
      res.redirect("/");
    } else {
      const hash = bcrypt.hashSync(req.body.password, 12);
      myDataBase.insertOne(
        { username: req.body.username, password: hash },
        (err, doc) => (err ? res.redirect("/") : next(null, doc.ops[0]))
      );
    }
  });
};

const login = passport.authenticate("local", { failureRedirect: "/" });

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

const githubAuth = passport.authenticate("github");

const githubCallback = (req, res) => {
  req.session.user_id = req.user.id;
  res.redirect("/chat");
};

module.exports = {
  renderIndexPage,
  registerUser,
  login,
  redirectToProfile,
  renderProfilePage,
  logout,
  githubAuth,
  githubCallback,
  renderChatPage,
};
