const express = require("express");
const passport = require("passport");
const LocalSrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

passport.use(
    new LocalSrategy(async(username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: "incorrect username"});
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "incorrect password"})
                }
            })
        } catch(err) {
            done(err);
        }
    })
)

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    };
})