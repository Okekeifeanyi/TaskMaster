import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable CORS

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api/db-test", async (req, res) => {
  try {
    // Import the pg library
    const pg = await import("pg");
    const { Pool } = pg.default; // Access Pool from the default export

    // Create a new Pool instance
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL, // Replace with your connection string or config object
    });

    // Query the database
    const result = await pool.query("SELECT NOW() as current_time");
    res.json({ success: true, current_time: result.rows[0].current_time });
  } catch (error) {
    console.error("Database test failed", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/get", (req, res) => {
  res.json({ message: "GET API endpoint" });
});

// Default route
app.get("/", (req, res) => {
  res.send("TaskMaster backend is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
