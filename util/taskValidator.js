const Ajv = require('ajv');

// Initialize AJV
const ajv = new Ajv();

// Define JSON Schema for Task validation
const taskValidationSchema = {
    type: "object",
    properties: {
        title: { type: "string", minLength: 1 },
        description: { type: "string", nullable: true },
        status: {
            type: "string",
            enum: ["pending", "completed"],
            default: "pending"
        },
        priority: {
            type: "integer",
            enum: [1, 2, 3],
            default: 2
        },
        user: { type: "string" }
    },
    required: ["title", "user"],  // Required fields
    additionalProperties: false,  // Prevent extra properties
};

// Compile the schema
const validateTask = ajv.compile(taskValidationSchema);

// Task validation middleware
const taskValidator = (req, res, next) => {
    const valid = validateTask(req.body);
    if (!valid) {
        return res.status(400).json({
            error: "Invalid Task Information",
            details: validateTask.errors,  // Provide error details
        });
    }
    next();  // Continue to the next middleware
};

module.exports = taskValidator;
