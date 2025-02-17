import jwt from 'jsonwebtoken';

const secretKey = "SECRETKEY";

const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if (!token) {
        return res.status(401).send("Sizin tokeniniz yoxdur");
    }
    try {
        let decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Sizin tokeniniz yalnisdir");
    }
};

export default AuthMiddleware; 