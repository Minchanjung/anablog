require("dotenv").config;
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

exports.get_posts = async (req, res) => {
    try {    
        const posts = await(Post.find({}).sort({ timeStamp: descending }).exec());
        return res.json(posts);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.get_single_post = async (req, res) => {
    try {
        const post = await(Post.findOne({ _id: req.params.id}).exec())
        res.json(post);
    } catch(err) {
        res.status(400).json(err);
    }
};

exports.edit_post = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) return res.status(400).json(err);

            req.authData = authData;
            next();
        })
    }, 

    body("title", "title must not be empty").trim().isLength({ min: 1}).escape(), 
    body("content", "content must not be empty").trim().isLength({ min: 1 }).escape(), 

    async (req, res) => {
        const errors = validationResult(req.body);

        try {
            const post = new Post({
                _id: req.params.id, 
                title: req.body.title, 
                content: req.body.content, 
                thumbnail: req.body.imgUrl, 
                timeStamp: Date.now(), 
            })

            const update = await(Post.findByIdAndUpdate(req.params.id, post, { new: true }).exec())
            
            return res.json(update);
        } catch(err) {
            return res.status(400).json(err);
        }
    }
]

exports.delete_post = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) return res.status(400).json(err);

            req.authData = authData;
            next();
        })
    }, 

    async (req, res) => {
        try {
            const deletePost = await(Post.findByIdAndDelete(req.params.id).exec());
            console.log(deletePost)
            res.json({ message: "Message Successfully Deleted"});
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    
]

exports.create_post = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) return res.status(400).json(err);

            req.authData = authData;
            next();
        })
    }, 

    body("title", "title must not be empty").trim().isLength({ min: 1}).escape(), 
    body("content", "content must not be empty").trim().isLength({ min: 1 }), 

    async (req, res) => {
        const errors = validationResult(req.body);

        try {
            const post = new Post({
                title: req.body.title, 
                content: req.body.content, 
                thumbnail: req.body.imgUrl, 
                timeStamp: Date.now(), 
            })

            const postSave = await(post.save());
            
            return res.json(postSave);
        } catch(err) {
            return res.status(400).json(err);
        }
    }
]