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
    required: ["title", "user"], // Required fields
    additionalProperties: false,
};

// Compile the schema
const validateTask = ajv.compile(taskValidationSchema);

const taskValidator = (req, res, nxt) => {
    const valid = validateTask(req.body);
    if (!valid) return res.status(400).send({
        error: "Inavlid Task Info",
        details: validateTask.errors,
    });
    nxt();
}

module.exports = taskValidator;
