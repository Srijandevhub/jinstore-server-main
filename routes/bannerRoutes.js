const express = require('express');
const { addBanner, getBanners } = require('../controllers/bannerControllers');
const { adminAuth } = require('../middlewares/auth');
const { bannerUpload } = require('../middlewares/upload');
const router = express.Router();

router.post("/add-banner", adminAuth, bannerUpload.single("image"), addBanner);
router.get("/get-banners", getBanners);

module.exports = router;