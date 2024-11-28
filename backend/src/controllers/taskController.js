import pool from "../config/db.js";

export const createTask = async (req, res) => {
  const { title, description, deadline, priority } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, deadline, priority, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, deadline, priority, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const getTasks = async (req, res) => {
  const { search, priority, deadline } = req.query;
  let query = "SELECT * FROM tasks WHERE user_id = $1";
  const params = [req.user.id];

  if (search) {
    query += " AND (title ILIKE $2 OR description ILIKE $2)";
    params.push(`%${search}%`);
  }
  if (priority) {
    query += " AND priority = $3";
    params.push(priority);
  }
  if (deadline) {
    query += " AND deadline <= $4";
    params.push(deadline);
  }

  try {
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, priority } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, deadline = $3, priority = $4 WHERE id = $5 RETURNING *",
      [title, description, deadline, priority, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
