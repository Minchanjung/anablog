require("dotenv").config();
require("../config/auth");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport")

exports.get_users = async (req, res, next) => {
    try {
        const user = await User.find().sort("username", ascending).exec();
        res.json(user);
    } catch(err) {
        res.json(err);
    }
}

exports.get_single_user = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).exec()
        res.json(user);
    } catch (err) {
        res.json(err);
    }
}

exports.log_in = (req, res) => {
    passport.authenticate("local", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: "incorrect username or password", 
                user, 
            })
        }

        jwt.sign(
            { _id: user._id, username: user.username }, 
            process.env.SECRET, 
            { expiresIn: "10m" }, 
            (err, token) => {
                if (err) return res.status(400).json(err);
                res.json({
                    token: token, 
                    user: { _id: user._id, username: user.username }
                })
            }
        )
    })(req, res)
}

exports.sign_up = [
    body("username", "username must not be empty")
        .trim()
        .isLength({min: 1, max: 50})
        .escape(), 
    body("password", "password must be at least 3 characters long")
        .trim()
        .isLength({min: 3})
        .escape(), 
    body("confirmPassword", "password must be at least 3 characters long")
        .trim()
        .isLength({min: 3})
        .escape()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("password confirm does not match");
            }

            return true;
        }), 
    
    async (req, res, next) => {
        console.log(req.body)
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            try {
                res.json({ errors: errors.array() })
            } catch (err) {
                next(err);
            }
        }

        //check if user exists
        const userExists = await User.find({ username: req.body.username });
        if (userExists.length > 0) {
            return res.status(409).json({
                error: "username already exists",
            })
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(401).json({
                error: "Passwords do not match"
            });
        }

        //create new user
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return next(err);

            try {
                const user = new User({
                    username: req.body.username, 
                    password: hash, 
                });
                user.save();
                res.status(200).json({message: "Sign Up Successful"});
            } catch(err) {
                res.status(400).json({error: "new user req failed"});
            }
         
        })

    }
]