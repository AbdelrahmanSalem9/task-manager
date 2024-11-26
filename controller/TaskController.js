const Task = require('../model/TaskModel');


const createNewTask = async (req, res) => {
    const newTask = await Task(req.body);
    const result = await newTask.save();
    return res.json(newTask);
};

const getTask = async (req, res) => {
    const result = await Task.find({ user: req.body.user, title: req.params.title });
    if (!result || result.length == 0) return res.status(404).send("No Tasks Found");
    res.json(result);
};

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.body.user, ...req.filter })
        .sort(req.sort)
    res.json(tasks);
};

const deleteTask = async (req, res) => {
    const result = await Task.findOneAndDelete({ user: req.body.user, title: req.params.title }).exec();
    if (!result) return res.status(400).json("Can't delete the task");
    res.json("Task Deleted..");
};

const updateTask = async (req, res) => {
    const result = await Task.findOneAndUpdate({ user: req.body.user, title: req.params.title }, req.body).exec();
    if (!result) return res.status(400).json("Can't update task");
    res.json("Task Updated");
};


module.exports = {
    createNewTask,
    getTask,
    deleteTask,
    updateTask,
    getTasks,
};







