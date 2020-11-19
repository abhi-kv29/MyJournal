//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.use(session({
  secret: "What are you doing",
  resave: false,
  saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/MyJournalDB", {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  googleId: String
});

const postSchema = new mongoose.Schema ({
  title: String,
   body: String,
   googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
const Post = new mongoose.model("Post", postSchema);


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/home",
    userProfileUrl: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res) {
  res.render("login");
});

app.get("/auth/google",
  passport.authenticate('google', { scope: 'email profile'})
);

  app.get("/auth/google/home",
    passport.authenticate("google", { failureRedirect: '/' }),
    function(req, res) {
      res.redirect("/Home");
    });

app.get("/Home", function(req, res){
  if (req.isAuthenticated()){
    Post.find({googleId: req.user.googleId}, function(err, posts){
      res.render("home", {
        posts: posts
        });
    });
  } else {
    res.redirect("/");
  }
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

app.get("/Write", function(req, res) {
  if (req.isAuthenticated()){
    res.render("write");
  } else {
    res.redirect("/");
  }
});

app.post("/Write", function(req, res) {

  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postBody,
    googleId: req.user.googleId
  });


  post.save(function(err){
    if (!err){
        res.redirect("/Home");
    }
  });
});

 app.get("/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

 Post.findOne({_id: requestedPostId}, function(err, post){
  res.render("display", {
    title: post.title,
    body: post.body
  });
});
});
