const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile } = require('../controllers/userController');

/**
 * User Routes
 * GET /api/user/profile - Get logged-in user profile
 * Protected route - requires authentication
 */
router.get('/profile', auth, getProfile);

module.exports = router;


