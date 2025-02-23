import jwt from 'jsonwebtoken';

const secretKey = "SECRETKEY";

const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if (!token) {
        return res.status(401).send("You don't have any token.");
    }
    try {
        let decoded = jwt.verify(token, secretKey);
        console.log('Decoded Token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).send("Your token is wrong.");
    }
};

export default AuthMiddleware; 