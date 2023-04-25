const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.get_users);

router.get("/:id", userController.get_single_user);

router.post("/log-in", userController.log_in);

router.post("/sign-up", userController.sign_up);

module.exports = router;
