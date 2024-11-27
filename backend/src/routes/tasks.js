import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTasks)  // Only authenticated users can view tasks
  .post(protect, createTask); // Only authenticated users can create tasks

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
