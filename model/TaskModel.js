const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    priority: {
        type: Number,
        enum: [1, 2, 3],
        default: 2
    },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});
TaskSchema.index({ user: 1 });
module.exports = mongoose.model("Task", TaskSchema);