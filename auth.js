const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const GitHubStrategy = require("passport-github").Strategy;

module.exports = (myDataBase) => {
  // Passport serialization and deserialization
  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectId(id) }, (err, doc) => {
      if (err) {
        done(err);
      } else {
        console.log("User document:", doc); // Add this line for debugging
        done(null, doc);
      }
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      myDataBase.findOne({ username: username }, (err, user) => {
        console.log(`User ${username} attempted to log in.`);
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!bcrypt.compareSync(password, user.password))
          return done(null, false);
        return done(null, user);
      });
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://fcc-advancednode.onrender.com",
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        myDataBase.findOneAndUpdate(
          { id: profile.id },
          {
            $setOnInsert: {
              id: profile.id,
              username: profile.username,
              name: profile.displayName || "John Doe",
              photo: profile.photos[0].value || "",
              email: Array.isArray(profile.emails)
                ? profile.emails[0].value
                : "No public email",
              created_on: new Date(),
              provider: profile.provider || "",
            },
            $set: { last_login: new Date() },
            $inc: { login_count: 1 },
          },
          { upsert: true, new: true },
          (err, doc) => cb(null, doc.value)
        );
      }
    )
  );
};
