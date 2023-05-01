require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
//const session = require("express-session")
require("./config/auth");

const usersRouter = require('./routes/users');
const commentRouter = require("./routes/comment");
const postRouter = require("./routes/post");

var app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB)
}

//app.use(session({ secret: "cats", resave: false, saveUninitialized: true })); 
app.use(passport.initialize());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/posts", postRouter);
app.use('/api/user', usersRouter);
app.use("/api/posts/:post_id/comment", commentRouter);

module.exports = app;
