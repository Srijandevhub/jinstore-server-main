const Product = require('../models/productModel');
const path = require('path');
const fs = require('fs');
const addProduct = async (req, res) => {
    try {
        const { title, shortdescription, description, sku, price, discount, isorganic, categoryid, brandid } = req.body;
        const thumbnailFile = req.files.thumbnail;
        const images = req.files.images;
        const relativethumbnailPath = path.relative(path.join(__dirname, "../uploads/products"), thumbnailFile[0].path);
        const relativeImagePaths = images.map(file => path.relative(path.join(__dirname, "../uploads/products"), file.path));
        const newProduct = new Product({
            title,
            shortdescription,
            description,
            sku,
            price: Number(price),
            discount: Number(discount),
            isorganic,
            categoryid,
            brandid,
            thumbnail: relativethumbnailPath,
            images: relativeImagePaths
        });
        await newProduct.save();
        res.status(200).json({ message: "Product added", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "Products fetched", products: products });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({ message: "Product fetched", product: product });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (product.thumbnail) {
            const oldThumbnailpath = path.join(__dirname, "../uploads/products", product.thumbnail);
            if (fs.existsSync(oldThumbnailpath)) {
                fs.unlinkSync(oldThumbnailpath);
            }
        }
        if (product.images.length > 0) {
            const paths = product.images.map(image => path.join(__dirname, "../uploads/products", image));
            paths.forEach((ele) => {
                if (fs.existsSync(ele)) {
                    fs.unlinkSync(ele);
                }
            })
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


const getProductslimited = async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query;
        const products = await Product.find().skip(Number(skip)).limit(Number(limit));
        res.status(200).json({ message: "Products fetched", products: products });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { addProduct, getProduct, getProducts, deleteProduct, getProductslimited };