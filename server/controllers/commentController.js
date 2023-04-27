require("dotenv").config;
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
    try {    
        const comments = await(Comment.find({}).sort({ timeStamp: descending }).exec());
        return res.json(comments);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.createComment = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) return res.status(400).json(err);

            req.authData = authData;
            next();
        })
    }, 

    async (req, res) => {
        try {
            const comment = new Comment({
                comment: req.body.comment, 
                author: req.authData._id, 
            })

            const saveComment = await(comment.save());
            return res.json(saveComment);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
]

exports.delete_comment = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) return res.status(400).json(err);

            req.authData = authData;
            next();
        })
    }, 
    async (req, res) => {
        try {
            const deleteComment = await(Comment.findByIdAndDelete(req.params.id).exec());
            console.log(deleteComment);
            return res.json({ message: "succesfully deleted comment" });
        } catch (err) {
            return res.status(400).json(err);
        }
    }
]