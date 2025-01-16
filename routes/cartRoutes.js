const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { getCart, addProductToCart, removeProductFromCart, getCartProductsFromAuth, getProductsFromNonAuth, clearCart, updateQuantity } = require('../controllers/cartController');
const router = express.Router();

router.get("/get-cart", userAuth, getCart);
router.post("/add-product", userAuth, addProductToCart);
router.post("/remove-product", userAuth, removeProductFromCart);
router.get("/cart-details", userAuth, getCartProductsFromAuth);
router.post("/cart-details", getProductsFromNonAuth);
router.post("/clear-cart", userAuth, clearCart);
router.post("/update-quantity", userAuth, updateQuantity);

module.exports = router;