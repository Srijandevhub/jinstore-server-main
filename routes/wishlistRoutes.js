const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { getWishlist, addProductToWishlist, removeProductFromWishlist, clearWishlist, getWishlistProducts } = require('../controllers/wishlistController');
const router = express.Router();

router.get("/get-wishlist", userAuth, getWishlist);
router.post("/add-product", userAuth, addProductToWishlist);
router.post("/delete-product", userAuth, removeProductFromWishlist);
router.post("/clear-wishlist", userAuth, clearWishlist);
router.post("/wishlist-details", userAuth, getWishlistProducts);

module.exports = router;