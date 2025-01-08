const express = require('express');
const { addBanner, getBanners, deleteBanner } = require('../controllers/bannerControllers');
const { adminAuth } = require('../middlewares/auth');
const { bannerUpload } = require('../middlewares/upload');
const router = express.Router();

router.post("/add-banner", adminAuth, bannerUpload.single("image"), addBanner);
router.get("/get-banners", getBanners);
router.delete("/delete-banner/:id", adminAuth, deleteBanner);

module.exports = router;