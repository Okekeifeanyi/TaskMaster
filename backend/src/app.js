import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
require('dotenv').config();  // Make sure this is included at the very top




dotenv.config();
const app = express();

// Database connection
connectDB();

app.use('/api/auth', authRoutes);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tasks', taskRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
