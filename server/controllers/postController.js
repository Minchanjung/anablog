require("dotenv").config;
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

// gets all posts
exports.get_posts = async (req, res) => {
    try {    
        const posts = await(Post.find({}).populate("author").sort({ timeStamp: "descending" }).exec());
        return res.json(posts);
    } catch (err) {
        return res.status(400).json(err);
    }
};

//gets all published posts
exports.get_published_posts = async (req, res) => {
    try {
        const posts = await(Post.find({published: true}).populate("author").sort({ timeStamp: descending }).exec());
        return res.json(posts);
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.publish_post = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) return res.status(400).json(err);

            req.authData = authData;
            next();
        })
    }, 

    async (req, res) => {
        try {
            const publishPost = await(Post.findOneAndUpdate({ _id: req.params.id }, { published: true }, { useFindAndModify: false, new: true }).populate("author").exec());
            return res.json(publishPost);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
]


exports.unpublish_post = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) return res.status(400).json(err);

            req.authData = authData;
            next();
        })
    }, 

    async (req, res) => {
        try {
            const unpublishPost = await(Post.findOneAndUpdate({ _id: req.params.id }, { published: false }, { useFindAndModify: false, new: true }).populate("author").exec());
            return res.json(unpublishPost);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
]


exports.get_single_post = async (req, res) => {
    try {
        const post = await(Post.findOne({ _id: req.params.id}).populate("author").exec())
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
                author: req.authData._id,
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
                published: false, 
                author: req.authData._id, 
                timeStamp: Date.now(), 
            })

            const postSave = await(post.save());
            
            return res.json(postSave);
        } catch(err) {
            return res.status(400).json(err);
        }
    }
]