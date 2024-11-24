const jwt = require('jsonwebtoken');
const config = require('./config.js');

const auth = (req, res, next) => {
    const token = req.cookies?.token || req.headers?.authorization;

    if(token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if(err) {
                res.status(401).json({
                    message: "Unauthorized"
                });
                return;
            } else {
                req.userid = decoded.userid;
                next();
            }
        });
    } else {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }
}

module.exports = auth;