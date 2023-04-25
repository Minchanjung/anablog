const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/", commentController.getComments);

router.post("/create", commentController.createComment);

router.delete("/:id/delete", commentController.delete_comment);