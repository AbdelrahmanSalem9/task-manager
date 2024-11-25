const express = require('express')
const router = express.Router();
const userController = require('../controller/UserController.js');
const userValidator = require('../util/UserValidation.js');
const adminPermission = require('../util/AuthMWPermission.js');


router.post('/', userValidator, userController.createUser);
router.get('/', adminPermission, userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', adminPermission, userController.updateUser);
router.delete('/:id', adminPermission, userController.deleteUser);

module.exports = router;