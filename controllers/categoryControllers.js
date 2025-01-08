const Category = require('../models/categoryModel');
const path = require('path');
const fs = require('fs');
const addCategory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file;
        const existsCategory = await Category.findOne({ title: title });
        if (existsCategory) {
            return res.status(400).json({ message: "Category exists" });
        }
        const relativeImagePath = path.relative(path.join(__dirname, '../uploads/categories'), file.path);
        const newCategory = new Category({
            title: title,
            description: description,
            thumbnail: relativeImagePath
        })
        await newCategory.save();
        res.status(200).json({ message: "Category added", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ message: "Categories fetched", categories: categories });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        res.status(200).json({ message: "Category fetched", category: category });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const file = req.file;
        const category = await Category.findById(id);
        if (file) {
            if (category.thumbnail) {
                const oldimagePath = path.join(__dirname, "../uploads/categories", category.thumbnail);
                if (oldimagePath && fs.existsSync(oldimagePath)) {
                    fs.unlinkSync(oldimagePath);
                }
            }
            const relativeImagePath = path.relative(path.join(__dirname, "../uploads/categories"), file.path);
            await Category.findByIdAndUpdate(id, {
                thumbnail: relativeImagePath
            });
        }
        await Category.findByIdAndUpdate(id, {
            title: title,
            description: description
        });
        res.status(200).json({ message: "Category updated" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        const filePath = path.join(__dirname, "../uploads/categories", category.thumbnail);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted", category: deletedCategory });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { addCategory, getCategories, getCategory, updateCategory, deleteCategory };