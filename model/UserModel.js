const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, minLength: 3, maxLength: 127 },
    isAdmin: { type: Boolean, required: true, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxnLength: 1024 },
    createdAt: { type: Date, default: Date.now },

})

const User = mongoose.model("User", userSchema);
module.exports = User