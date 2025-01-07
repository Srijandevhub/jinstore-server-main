const Brand = require('../models/brandModel');
const addBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const brand = await Brand.findOne({ name: name });
        if (brand) {
            return res.status(400).json({ message: "Brand already exists" });
        }
        const newBrand = new Brand({ name: name });
        await newBrand.save();
        res.status(200).json({ message: "Brand created" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json({ message: "Brands fetched", brands: brands });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById(id);
        res.status(200).json({ message: "brand fetched", brand: brand });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await Brand.findByIdAndUpdate(id, { name: name });
        res.status(200).json({ message: "brand updated" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        await Brand.findByIdAndDelete(id);
        res.status(200).json({ message: "brand deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { addBrand, getBrands, getBrand, updateBrand, deleteBrand };