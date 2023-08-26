const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");
const sessionStore = require("../store/sessionStore.js");

const onAuthorizeSuccess = (data, accept) => {
  console.log("successful connection to socket.io");
  accept(null, true);
};
const onAuthorizeFail = (data, message, error, accept) => {
  if (error) throw new Error(message);
  console.log("failed connection to socket.io:", message);
  accept(null, false);
};

const authorizeSocket = () =>
  passportSocketIo.authorize({
    cookieParser,
    key: "express.sid",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail,
  });

module.exports = authorizeSocket;