import pkg from "pg";
const { Pool } = pkg;

// Create a connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Enterprise-app",
  password: "1234",
  port: 5432,
});

// Function to connect to the database
export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Postgres connected successfully.");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit the app if there's a connection error
  }
};

export default pool; // Optional: Export the pool directly
