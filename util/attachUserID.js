const jwt = require('jsonwebtoken');

const attachUserID = (req, res, nxt) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.body.user = payload.userid;
        // console.log(req.user);
        nxt();
    } catch (err) {
        res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = attachUserID;