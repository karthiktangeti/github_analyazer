const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const githubRoutes = require("./routes/githubRoutes");
const historyRoutes = require("./routes/historyRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin =
  process.env.ALLOWED_ORIGIN || "https://karthiktangeti.github.io";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Vary", "Origin");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      allowedOrigin,
      "https://www.karthiktangeti.github.io",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHub Analyzer API Running");
});

app.use("/api/github", githubRoutes);
app.use("/api/history", historyRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT} without database connection`);
    });
  });
