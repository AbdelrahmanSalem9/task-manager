const express = require('express')
const router = express.Router();
const userController = require('../controller/UserController.js');
const userValidator = require('../util/UserValidation.js');


router.post('/', userValidator, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;