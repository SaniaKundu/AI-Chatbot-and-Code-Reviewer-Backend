const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");
const chatRoutes = require("./routes/chat.routes");
const authRoutes = require("./routes/auth.routes");
const historyRoutes = require("./routes/history.routes");

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// Root Route
// =========================
app.get("/", (req, res) => {
  res.send("AI Backend Running");
});

// =========================
// API Routes
// =========================
app.use("/ai", aiRoutes);
app.use("/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

// =========================
// 404 Route
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

module.exports = app;