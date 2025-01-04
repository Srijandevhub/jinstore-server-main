const jwt = require('jsonwebtoken');
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const secret = process.env.JWT_SECRET;
const User = require('../models/userModel');
const userAuth = async (req, res, next) => {
    const usertoken = req.cookie.jinstoreuser;
    const refreshtoken = req.cookie.jinstorerefresh;
    if (!usertoken) {
        if (!refreshtoken) {
            return res.status(403).json({ message: "Access denied" });
        } else {
            jwt.verify(refreshtoken, refreshSecret, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Access denied" });
                }
            })
        }
    }
}