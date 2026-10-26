
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");

const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LearnSpace Backend Server is running!",
  });
});

// Health check routes
app.use("/api/health", healthRoutes);
app.use(errorMiddleware);
// Start server
app.listen(PORT, () => {
  console.log(
    `LearnSpace backend running at http://localhost:${PORT}`
  );
});

module.exports = app;
