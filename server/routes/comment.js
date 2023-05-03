const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../config/verifyToken");

router.get("/", commentController.getComments);

router.post("/", commentController.createComment);

router.delete("/:id/delete", verifyToken, commentController.delete_comment);

module.exports = router;