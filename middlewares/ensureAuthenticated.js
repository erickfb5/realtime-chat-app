const ensureAuthenticated = (req, res, next) =>
  req.isAuthenticated() ? next() : res.redirect("/");

module.exports.ensureAuthenticated = ensureAuthenticated;