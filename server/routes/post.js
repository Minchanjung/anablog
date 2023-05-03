const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../config/verifyToken");

//get all posts
router.get("/", postController.get_posts);

//get single post
router.get("/:id", postController.get_single_post);

//create a post
router.post("/create", verifyToken, postController.create_post);

//put edit post
router.put("/:id/edit", verifyToken, postController.edit_post);

//delete a post 
router.delete("/:id/delete", verifyToken, postController.delete_post);

module.exports = router;