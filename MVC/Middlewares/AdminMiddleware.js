const AdminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can perform this action." });
    }
    next();
};

export default AdminMiddleware;
