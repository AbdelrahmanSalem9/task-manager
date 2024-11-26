const router = require('express').Router();
const validateTask = require('../util/TaskValidation.js');
const taskController = require('../controller/TaskController.js');
const filteringMiddleware = require('../middlewares/TaskFilterMW.js');
const sortingMiddleware = require('../middlewares/TaskSortingMW.js');


// Get Tasks applying filters
router.get('/', filteringMiddleware, sortingMiddleware, taskController.getTasks);

router.get('/:title', taskController.getTask);

// Create new Task
router.post('/', validateTask, taskController.createNewTask);


// Update Task
router.put('/:title', taskController.updateTask);


// Delete Task
router.delete('/:title', taskController.deleteTask);


module.exports = router