const express = require('express');

const aiController = require("../controllers/ai.controller");
const authMiddleware = require("../middleware/auth.middleware");



const router = express.Router();


//router.get("/get-response", aiController.getResponse);


router.post(
  "/get-review",
  authMiddleware,
  aiController.getReview
);



module.exports = router;