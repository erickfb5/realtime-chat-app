const session = require("express-session");
const sessionStore = require('../store/sessionStore.js')

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  key: "express.sid",
  store: sessionStore,
});