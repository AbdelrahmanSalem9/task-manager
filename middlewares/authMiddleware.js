require('dotenv').config();
const jwt = require('jsonwebtoken');

const permission = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send("Access Denied: No token provided.");
    }

    try {
        // Verify the token and extract the payload
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        // Check if the user has admin privileges
        if (!payload.isAdmin) {
            return res.status(403).send("Access Denied: Admins only.");
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Log error for debugging purposes (optional)
        console.error('Token verification failed:', err);
        return res.status(400).send("Invalid Token.");
    }
};

module.exports = permission;
