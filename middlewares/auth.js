const jwt = require('jsonwebtoken');
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const secret = process.env.JWT_SECRET;
const User = require('../models/userModel');
const userAuth = (req, res, next) => {
    const usertoken = req.cookies.jinstoreuser;
    const refreshtoken = req.cookies.jinstorerefresh;
    if (!usertoken) {
        if (!refreshtoken) {
            return res.status(403).json({ message: "Access denied" });
        } else {
            jwt.verify(refreshtoken, refreshSecret, async (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Access denied" });
                }
                const getUser = await User.findById(user.userid).select("-password");
                if (!getUser) {
                    return res.status(403).json({ message: "Access denied" });
                }
                const newUserToken = jwt.sign({ userid: getUser._id, role: getUser.role }, secret, { expiresIn: '1d' });
                res.cookie("jinstoreuser", newUserToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                req.user = { userid: getUser._id };
                next();
            })
        }
    } else {
        jwt.verify(usertoken, secret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Access denied" });
            }
            req.user = user;
            next();
        });
    }
}

const adminAuth = (req, res, next) => {
    const usertoken = req.cookies.jinstoreuser;
    const refreshtoken = req.cookies.jinstorerefresh;
    if (!usertoken) {
        if (!refreshtoken) {
            return res.status(403).json({ message: "Access denied" });
        } else {
            jwt.verify(refreshtoken, refreshSecret, async (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Access denied" });
                }
                const getUser = await User.findById(user.userid).select("-password");
                if (!getUser) {
                    return res.status(403).json({ message: "Access denied" });
                }
                if (getUser.role !== 'admin') {
                    return res.status(403).json({ message: "Access denied" });
                }
                const newUserToken = jwt.sign({ userid: getUser._id, role: getUser.role }, secret, { expiresIn: '1d' });
                res.cookie(" jinstoreuser",newUserToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                next();
            })
        }
    } else {
        jwt.verify(usertoken, secret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Access denied" });
            }
            if (user.role !== 'admin') {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        });
    }
}

module.exports = { userAuth, adminAuth };