const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const User = require("../models/User");

console.log("running auth file now");

passport.use(
    new LocalStrategy(async(username, password, done) => {
        console.log(username);
        console.log(password);
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

passport.use(
    new JWTStrategy({
        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken, 
        secretOrKey: process.env.SECRET, 
    }, 
    (jwtPayload, done) => {
        if (Date.now > jwtPayload.expires) {
            return done("jwt expired");
        }
        return done(null, jwtPayload);
    }
    )
)

module.exports = passport;