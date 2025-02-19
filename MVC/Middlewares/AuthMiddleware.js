import jwt from 'jsonwebtoken';

const secretKey = "SECRETKEY";

const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if (!token) {
        return res.status(401).send("You don't have any token.");
    }
    try {
        let decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Your token is wrong.");
    }
};

export default AuthMiddleware; 