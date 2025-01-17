const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { createOrder } = require('../controllers/orderControllers');
const router = express.Router();

router.post("/create-order", userAuth, createOrder);

module.exports = router;