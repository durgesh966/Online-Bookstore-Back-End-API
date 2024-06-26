const JWT = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
    // first chack request hadder has authorizetion or not
    const authorization = req.headers.authorization;
    // extract token
    const token = req.headers.authorization.split(" ")[1];

    if (!authorization) {
        return res.status(401).json({ error: "unauthorized user" });
    } else if (!token) {
        return res.status(401).json({ error: 'Token Not Found' });
    }

    try {
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
}

const generateToken = (userData) => {
    return JWT.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { jwtAuthMiddleware, generateToken }