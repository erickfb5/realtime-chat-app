const errorhandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", { message: "Something went wrong!" });
};

module.exports = errorhandler;