const Ajv = require('ajv');

// Initialize AJV
const ajv = new Ajv();

// Define the schema for user validation
const schema = {
    type: "object",
    properties: {
        fullName: {
            type: "string",
            minLength: 3,
            pattern: "^([A-Z][a-z]*)(\\s[A-Z][a-z]*)*$" // Full name should have proper capitalization
        },
        email: {
            type: "string",
            pattern: "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" // More reliable email regex
        },
        password: {
            type: "string",
            maxLength: 1024
        }
    },
    required: ["fullName", "email", "password"], // All fields are required
    additionalProperties: false, // Prevent extra properties
};

// Compile the schema
const validateUser = ajv.compile(schema);

// User validation middleware
const userValidator = (req, res, next) => {
    const valid = validateUser(req.body);
    if (!valid) {
        return res.status(400).json({
            errorType: "User Validation Error",
            details: validateUser.errors, // Provide validation errors
        });
    }
    next(); // Proceed to next middleware if valid
};

module.exports = userValidator;
