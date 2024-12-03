const Task = require('../models/Task');

// Create a new task
const createNewTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const result = await newTask.save();
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating task:", error.message);
        res.status(400).json({ error: "Unable to create task" });
    }
};

// Get a specific task by title for a user
const getTask = async (req, res) => {
    try {
        const { user } = req.body;
        const { title } = req.params;

        const task = await Task.findOne({ user, title });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all tasks for a user with optional filters and sorting
const getTasks = async (req, res) => {
    try {
        const { user } = req.body;
        const { filter = {}, sort = {} } = req;

        const tasks = await Task.find({ user, ...filter }).sort(sort);
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a specific task by title for a user
const deleteTask = async (req, res) => {
    try {
        const { user } = req.body;
        const { title } = req.params;

        const result = await Task.findOneAndDelete({ user, title });
        if (!result) {
            return res.status(404).json({ error: "Unable to delete task" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a specific task by title for a user
const updateTask = async (req, res) => {
    try {
        const { user } = req.body;
        const { title } = req.params;

        const updatedTask = await Task.findOneAndUpdate(
            { user, title },
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedTask) {
            return res.status(404).json({ error: "Unable to update task" });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createNewTask,
    getTask,
    getTasks,
    deleteTask,
    updateTask,
};
