const express = require('express');
const { adminAuth } = require('../middlewares/auth');
const { addBrand, getBrands, getBrand, updateBrand, deleteBrand } = require('../controllers/brandControllers');
const router = express.Router();

router.post("/add-brand", adminAuth, addBrand);
router.get("/get-brands", adminAuth, getBrands);
router.get("/get-brand/:id", adminAuth, getBrand);
router.put("/update-brand/:id", adminAuth, updateBrand);
router.delete("/delete-brand/:id", adminAuth, deleteBrand);

module.exports = router;