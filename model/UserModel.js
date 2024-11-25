const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, minLength: 3, maxLength: 127 },
    isAdmin: { type: Boolean, required: true, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxnLength: 1024 },
    createdAt: { type: Date, default: Date.now },
});

userSchema.methods.genAuthToken = function () {
    return jwt.sign({ userid: this._id, isAdmin: this.isAdmin }, process.env.SECRET_KEY);
}
const User = mongoose.model("User", userSchema);
module.exports = User