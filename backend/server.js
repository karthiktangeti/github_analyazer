const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const githubRoutes = require("./routes/githubRoutes");
const historyRoutes = require("./routes/historyRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://karthiktangeti.github.io",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("GitHub Analyzer API Running");
});

// API routes
app.use("/api/github", githubRoutes);
app.use("/api/history", historyRoutes);

// Connect database and start server
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Server running on port ${PORT} without database connection`
      );
    });
  });