const express = require('express');
const { adminAuth } = require('../middlewares/auth');
const { productUpload } = require('../middlewares/upload');
const { addProduct, getProducts, deleteProduct, getProduct, getProductslimited } = require('../controllers/productControllers');
const router = express.Router();

router.post("/add-product", adminAuth, productUpload.fields([ { name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 3 } ]), addProduct);
router.get("/get-products", getProducts);
router.get("/get-product/:id", getProduct);
router.delete("/delete-product/:id", adminAuth, deleteProduct);
router.get("/get-limited-products", getProductslimited);

module.exports = router;