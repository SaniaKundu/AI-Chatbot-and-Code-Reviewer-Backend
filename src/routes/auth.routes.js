const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

console.log("AUTH ROUTES CHECK:");
console.log("registerUser:", typeof registerUser);
console.log("loginUser:", typeof loginUser);
console.log("getProfile:", typeof getProfile);
console.log("authMiddleware:", typeof authMiddleware);

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;