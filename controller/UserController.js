const User = require('../model/UserModel.js')


const createUser = async (req, res) => {
    const newUser = new User(req.body);
    const result = await newUser.save();
    if (!result) return res.sendStatus(400);
    res.json(result);
};

const getAllUsers = async (req, res) => {
    // admin authorization
    const result = await User.find();
    if (!result) return res.sendStatus(404)
    res.json(result);
};

const getUser = async (req, res) => {
    const result = await User.findById(req.params.id);
    if (!result) return res.status(404).send("User with this ID not found");
    res.json(result);

};

const updateUser = async (req, res) => {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
    if (!result) return res.status(404).send("User with this ID not found");
    res.json(result);
};

const deleteUser = async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("User with this ID not found");
    res.send(`User with ID ${req.params.id} is deleted`);
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
}

