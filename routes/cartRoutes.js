const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { getCart } = require('../controllers/cartController');
const router = express.Router();

router.get("/get-cart", userAuth, getCart);

module.exports = router;