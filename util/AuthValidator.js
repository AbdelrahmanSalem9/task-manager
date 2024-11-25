const Ajv = require('ajv');

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        email: { type: "string", pattern: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" },
        password: { type: "string", maxLength: 1024 },
    },
    required: ["email", "password"]
}

const validation = ajv.compile(schema);
const validator = (req, res, nxt) => {
    const valid = validation(req.body);
    if (!valid) {
        return res.status(400).json({
            errorType: "User Logging Error",
            details: validation.errors,
        });
    }
    nxt();
};

module.exports = validator;

