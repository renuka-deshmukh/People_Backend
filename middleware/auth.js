const jwt = require("jsonwebtoken")

const protect = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).send({ msg: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECREATE_KEY);
        req.user = decoded
        next();

    } catch (error) {
        res.status(401).send({ msg: "Invalid or expired token" })
    }
};


module.exports = {
    protect
}
