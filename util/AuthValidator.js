const Ajv = require('ajv');
const ajv = new Ajv();

// Define JSON schema for user input validation
const schema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            pattern: "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
        },
        password: { type: "string", maxLength: 1024 },
    },
    required: ["email", "password"],
    additionalProperties: false,  // Prevent unexpected properties
};

// Compile schema into a validation function
const validate = ajv.compile(schema);

// Validator middleware to check if request body is valid
const validator = (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
        return res.status(400).json({
            errorType: "User Logging Error",
            details: validate.errors,
        });
    }
    next(); // Continue to next middleware if valid
};

module.exports = validator;
