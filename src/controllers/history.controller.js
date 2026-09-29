const History = require("../models/History");

// Get all history of logged-in user
const getHistory = async (req, res) => {
  try {
    const history = await History.find({
      user: req.user.id,
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Get History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};


// Get single history
const getSingleHistory = async (req, res) => {
  try {
    const history = await History.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Single History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};


// Delete history
const deleteHistory = async (req, res) => {
  try {
    const history = await History.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error("Delete History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete history",
    });
  }
};


module.exports = {
  getHistory,
  getSingleHistory,
  deleteHistory,
};