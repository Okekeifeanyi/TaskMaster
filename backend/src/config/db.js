import { Pool } from 'pg';
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";


// Load environment variables
dotenv.config();

// Connect to PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined, // Convert port to a number
});

export const connectDB = () => {
  pool
    .connect()
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Error connecting to database:', err));
};

export default pool;