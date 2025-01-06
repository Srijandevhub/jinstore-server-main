const express = require('express');
const { adminAuth } = require('../middlewares/auth');
const { addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryControllers');
const { categoryUpload } = require('../middlewares/upload');
const router = express.Router();

router.post("/save-category", adminAuth, categoryUpload.single('thumbnail'), addCategory);
router.get("/get-categories", getCategories);
router.get("/get-category/:id", getCategory);
router.put("/update-category/:id", adminAuth, categoryUpload.single('thumbnail'), updateCategory);
router.delete("/delete-category/:id", adminAuth, deleteCategory);

module.exports = router;