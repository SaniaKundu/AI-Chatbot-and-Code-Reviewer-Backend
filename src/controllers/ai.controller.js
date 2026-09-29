const aiService = require("../services/ai.service");
const History = require("../models/History");

module.exports.getReview = async (req, res) => {
  try {
    console.log("✅ Request reached AI Controller");

    const code = req.body.code;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: "Code is required",
      });
    }

    // Send code to AI service
    const response = await aiService(code);

    // Save code review in MongoDB
    await History.create({
      user: req.user.id,
      type: "review",
      title: "Code Review",
      code: code,
      review: response,
    });

    console.log("✅ Code review saved to history");

    // Send review to frontend
    res.status(200).json({
      success: true,
      review: response,
    });

  } catch (error) {
    console.error("❌ AI Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};