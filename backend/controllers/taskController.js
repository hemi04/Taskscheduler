const Task = require('../models/Task');

/**
 * Create a new task
 * POST /api/tasks
 * Protected route - requires authentication
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        message: 'Please provide a task title',
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'pending',
      user: req.user._id, // User ID from auth middleware
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Get all tasks for logged-in user
 * GET /api/tasks?status=pending&search=keyword
 * Protected route - requires authentication
 */
exports.getTasks = async (req, res) => {
  try {
    const { status, search } = req.query;
    const userId = req.user._id;

    // Build query
    const query = { user: userId };

    // Filter by status if provided
    if (status && (status === 'pending' || status === 'completed')) {
      query.status = status;
    }

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Fetch tasks
    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Update a task
 * PUT /api/tasks/:id
 * Protected route - requires authentication
 */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Find task and verify ownership
    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined && (status === 'pending' || status === 'completed')) {
      task.status = status;
    }

    // Save updated task
    await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Delete a task
 * DELETE /api/tasks/:id
 * Protected route - requires authentication
 */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find task and verify ownership
    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    // Delete task
    await Task.deleteOne({ _id: id });

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};


