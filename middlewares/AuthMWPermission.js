require('dotenv').config()
const jwt = require('jsonwebtoken');


const permission = (req, res, nxt) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("Access Denied...");
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        if (!payload.isAdmin) return res.status(401).send("Access Denied...")
        nxt();
    } catch {
        res.status(400).send("Invalid Token");
    }
}

module.exports = permission