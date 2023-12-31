"use strict";
require("dotenv").config();
const express = require("express");
const passport = require("passport");

const myDB = require("./connection");
const routes = require("./routes.js")
const auth = require("./auth/auth.js");
const { sessionMiddleware, authorizeSocket, errorHandler } = require("./middlewares");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.set("view engine", "pug");
app.set("views", "./views/pug");

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.use(authorizeSocket());

myDB(async (client) => {
  const myDataBase = await client.db("database").collection("users");
  console.log("Connected to the database");
 
  // Mount the routes from routes.js
  app.use("/", routes(myDataBase));

  auth(myDataBase);
  
  let currentUsers = 0;
  io.on("connection", (socket) => {
    ++currentUsers;
    io.emit("user", { username: socket.request.user.username, currentUsers, connected: true });
    socket.on("chat message", (message) => io.emit("chat message", { username: socket.request.user.username, message }));
    console.log("A user has connected");
    socket.on("disconnect", () => {
      console.log("A user has disconnected");
      --currentUsers;
      io.emit("user", { username: socket.request.user.username, currentUsers, connected: false });
    });
  });
}).catch((err) => {
  app.route("/").get((req, res) => res.render("index", { title: err, message: "Unable to connect to database" }));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Listening on port ${PORT}`));