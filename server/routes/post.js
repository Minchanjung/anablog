const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//get all posts
router.get("/", postController.get_posts);

//get single post
router.get("/post/:id", postController.get_single_post);

//create a post
router.post("/post/create", postController.create_post);

//put edit post
router.put("/post/:id/edit", postController.edit_post);

//delete a post 
router.delete("/post/:id/delete", postController.delete_post);

module.exports = router;