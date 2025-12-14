const User = require('../models/User');

/**
 * Get logged-in user profile
 * GET /api/user/profile
 * Protected route - requires authentication
 */
exports.getProfile = async (req, res) => {
  try {
    // User is attached to request by auth middleware
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};


