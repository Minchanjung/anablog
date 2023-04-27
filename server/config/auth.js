const express = require("express");
const passport = require("passport");
const LocalSrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

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