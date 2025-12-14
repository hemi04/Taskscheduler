const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

/**
 * Task Routes
 * All routes are protected - require authentication
 * POST   /api/tasks - Create a new task
 * GET    /api/tasks - Get all tasks for logged-in user
 * PUT    /api/tasks/:id - Update a task
 * DELETE /api/tasks/:id - Delete a task
 */
router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;


