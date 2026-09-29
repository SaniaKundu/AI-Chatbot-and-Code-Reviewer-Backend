const chatService = require("../services/chat.service");
const History = require("../models/History");

module.exports.getChat = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    // =====================================
    // 1. Find existing conversation
    // =====================================

    let conversation = null;

    if (conversationId) {
      conversation = await History.findOne({
        _id: conversationId,
        user: req.user.id,
        type: "chat",
      });
    }

    // =====================================
    // 2. Send message to AI
    // =====================================

    const response = await chatService(message);

    const aiResponse =
      typeof response === "string"
        ? response
        : JSON.stringify(response);

    // =====================================
    // 3. Create new conversation
    // =====================================

    if (!conversation) {
      conversation = await History.create({
        user: req.user.id,

        type: "chat",

        // First user message becomes title
        title: message.substring(0, 40),

        messages: [
          {
            role: "user",
            content: message,
          },
          {
            role: "assistant",
            content: aiResponse,
          },
        ],
      });

      console.log("✅ New chat conversation created");
    }

    // =====================================
    // 4. Add messages to existing conversation
    // =====================================

    else {
      conversation.messages.push({
        role: "user",
        content: message,
      });

      conversation.messages.push({
        role: "assistant",
        content: aiResponse,
      });

      await conversation.save();

      console.log("✅ Message added to existing conversation");
    }

    // =====================================
    // 5. Send response to frontend
    // =====================================

    res.status(200).json({
      success: true,

      response: response,

      // Important for frontend
      conversationId: conversation._id,

      // Return complete conversation
      messages: conversation.messages,
    });

  } catch (error) {
    console.error("❌ Chat Controller Error:", error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};