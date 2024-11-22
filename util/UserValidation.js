const Ajv = require('ajv');

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        fullName: { type: "string", minLength: 3, pattern: "^([A-Z][a-z]*)(\\s[A-Z][a-z]*)*$" },
        email: { type: "string", pattern: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" },
        password: { type: "string", pattern: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$", minLength: 8, maxLength: 28 },
    },
    required: ["fullName", "email", "password"]
}

const validation = ajv.compile(schema);
const userValidator = (req, res, nxt) => {
    const valid = validation(req.body);
    if (!valid) {
        return res.status(400).json({
            errorType: "User Validation Error",
            details: validation.errors,
        });
    }
    nxt();
};
module.exports = userValidator;