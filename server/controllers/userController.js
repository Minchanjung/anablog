const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.get_users = (req, res) => {

}

exports.get_single_user = (req, res) => {

}

exports.log_in = (req, res) => {

}

exports.sign_up = (req, res) => [
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

            User.create(
                { username: req.body.username, password: hash }, 
                (err, user) => {
                    if (err) return next(err);

                    jwt.sign(
                        { _id: user._id, username: user.username }, 
                        process.env.SECRET, 
                        { expiresIn: "5m" }, 
                        (err, token) => {
                            if (err) return next(err);

                            return res.status(200).json({
                                token, 
                                user: {
                                    _id: user._id, 
                                    username: user.username,
                                }, 
                                message: "SignUp Succesful",
                            })
                        }
                    )
                }
            )
        })

    }
]