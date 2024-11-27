const express = require("express");
const taskController = require("../controllers/taskController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/tasks", authenticateJWT, taskController.createTask);
router.get("/tasks", authenticateJWT, taskController.getTasks);
router.put("/tasks/:id", authenticateJWT, taskController.updateTask);
router.delete("/tasks/:id", authenticateJWT, taskController.deleteTask);

module.exports = router;
