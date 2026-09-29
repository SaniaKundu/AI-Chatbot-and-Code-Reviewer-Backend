const express = require("express");

const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/message",
  authMiddleware,
  chatController.getChat
);

module.exports = router;