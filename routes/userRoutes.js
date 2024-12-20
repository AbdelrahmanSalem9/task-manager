const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const userValidator = require('../util/userValidator.js');
const adminPermission = require('../middlewares/authMiddleware.js');

// Create a new user
router.post('/', userValidator, userController.createUser);

// Get all users (admin only)
router.get('/', adminPermission, userController.getAllUsers);

// Get a specific user by ID
router.get('/:id', userController.getUser);

// Update user by ID (admin only)
router.put('/:id', adminPermission, userController.updateUser);

// Delete user by ID (admin only)
router.delete('/:id', adminPermission, userController.deleteUser);

module.exports = router;
