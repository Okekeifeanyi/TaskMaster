const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); // Load environment variables

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

module.exports = app;
