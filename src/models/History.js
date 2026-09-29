const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["review", "chat"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      default: "",
    },

    code: {
      type: String,
      default: "",
    },

    review: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // Chat conversation messages
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },

        content: {
          type: String,
          required: true,
        },

        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("History", historySchema);