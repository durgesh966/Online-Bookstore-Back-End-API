const JWT = require("jsonwebtoken");

exports.userJWTAuthMiddleware = (req, res, next) => {
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

exports.generateUserToken = (userData) => {
    return JWT.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// generrate token for Admin

exports.adminJWTAuthMiddleware = (req, res, next) => {
    // first chack request hadder has authorizetion or not
    const authorization = req.headers.authorization;
    // extract token
    const token = req.headers.authorization.split(" ")[1];

    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized user tis person is not admin" });
    } else if (!token) {
        return res.status(401).json({ error: 'Token Not Found' });
    }

    try {
        const decode = JWT.verify(token, process.env.ADMIN_JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
}

exports.generateAdminToken = (userData) => {
    return JWT.sign(userData, process.env.ADMIN_JWT_SECRET, { expiresIn: "1h" });
}
