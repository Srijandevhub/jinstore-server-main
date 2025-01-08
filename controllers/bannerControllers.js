const Banner = require('../models/bannerModel');
const path = require('path');
const fs = require('fs');
const addBanner = async (req, res) => {
    try {
        const { heading, description, slug } = req.body;
        const file = req.file;
        const relativePath = path.relative(path.join(__dirname, "../uploads/banners"), file.path);
        const newBanner = new Banner({
            image: relativePath,
            heading: heading,
            description: description,
            slug: slug
        });
        await newBanner.save();
        res.status(200).json({ message: "Banner added", banner: newBanner });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({ maessage: "Banners fetched", banners: banners });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);
        if (banner.image) {
            const oldPath = path.join(__dirname, "../uploads/banners", banner.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
        await Banner.findByIdAndDelete(id);
        res.status(200).json({ message: "Banner deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { addBanner, getBanners, deleteBanner };