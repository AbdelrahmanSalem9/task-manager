const router = require('express').Router();
const validateTask = require('../util/TaskValidation.js');
const taskController = require('../controller/TaskController.js');
const filteringMiddleware = require('../middlewares/TaskFilterMW.js');
const sortingMiddleware = require('../middlewares/TaskSortingMW.js');

// Get all tasks with filtering and sorting
router.get('/', filteringMiddleware, sortingMiddleware, taskController.getTasks);

// Get a specific task by title
router.get('/:title', taskController.getTask);

// Create a new task
router.post('/', validateTask, taskController.createNewTask);

// Update an existing task by title
router.put('/:title', taskController.updateTask);

// Delete a task by title
router.delete('/:title', taskController.deleteTask);

module.exports = router;
