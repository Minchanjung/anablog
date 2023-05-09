require("dotenv").config;
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
    try {    
        const comments = await(Comment.find({}).sort({ timeStamp: "descending" }).populate("author").exec());
        let filteredComments = comments.filter((comment) => comment.postId == req.params.post_id)
        console.log(filteredComments);
        return res.json(filteredComments);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.createComment = [
    body("comment", "comment must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(), 

    async (req, res) => {
        try {
            const comment = new Comment({
                comment: req.body.content, 
                author: req.body.author, 
                postId: req.params.post_id
            })

            const saveComment = await(comment.save());
            return res.json(saveComment);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
]

exports.delete_comment = async (req, res) => {
    try {
        const deleteComment = await(Comment.findByIdAndDelete(req.params.id).exec());
        console.log(deleteComment);
        return res.json({ message: "succesfully deleted comment" });
    } catch (err) {
        return res.status(400).json(err);
    }
}
       