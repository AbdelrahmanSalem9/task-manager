const jwt = require('jsonwebtoken');

const attachUserID = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        // Attach the user ID to the request object
        req.body.user = payload.userid;
        next();  // Call the next middleware
    } catch (err) {
        // Handle invalid token
        res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = attachUserID;
