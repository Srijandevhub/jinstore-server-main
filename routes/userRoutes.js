const express = require('express');
const { registerUser, loginUser, getLoggedinUser, adminAuthProtected, logoutUser } = require('../controllers/userController');
const { userAuth, adminAuth } = require('../middlewares/auth');
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/loggedin-user", userAuth, getLoggedinUser);
router.get("/admin-protected", adminAuth, adminAuthProtected);
router.post("/logout-user", userAuth, logoutUser);

module.exports = router;