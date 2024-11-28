import express from "express";
import {
  createUser,
  findUserByEmail,
  comparePassword,
} from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Test Route (for checking DB connection)
router.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "PostgreSQL connected", time: result.rows[0].now });
  } catch (err) {
    console.error("Error querying PostgreSQL", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// User Registration (only one handler here)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use." });
    }

    // Create the user
    const newUser = await createUser(email, password);
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { user: { id: user.id, email: user.email } },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
});

export default router;
