const express = require("express");

const router = express.Router();

const {
  getHistory,
  getSingleHistory,
  deleteHistory,
} = require("../controllers/history.controller");

const authMiddleware = require("../middleware/auth.middleware");


// Get all history
router.get("/", authMiddleware, getHistory);

// Get one history
router.get("/:id", authMiddleware, getSingleHistory);

// Delete history
router.delete("/:id", authMiddleware, deleteHistory);

module.exports = router;