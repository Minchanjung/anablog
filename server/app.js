require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

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

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", postRouter);
app.use('/user', usersRouter);
app.use("/post/comment", commentRouter);

module.exports = app;
