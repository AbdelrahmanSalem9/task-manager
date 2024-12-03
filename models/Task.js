const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        priority: {
            type: Number,
            enum: [1, 2, 3], // 1: High, 2: Medium, 3: Low
            default: 2,
        },
        dueDate: Date,
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
        versionKey: false, // Disable the `__v` field for cleaner documents
    }
);

// Indexes
TaskSchema.index({ user: 1 });

module.exports = mongoose.model("Task", TaskSchema);
