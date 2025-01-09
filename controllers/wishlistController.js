const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');
const getWishlist = async (req, res) => {
    try {
        const userid = req.user.userid;
        const wishlist = await Wishlist.findOne({ userid: userid });
        if (!wishlist) {
            return res.status(400).json({ message: "Wishlist not found" });
        }
        res.status(200).json({ message: "Wishlist fetched", wishlist: wishlist });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

const addProductToWishlist = async (req, res) => {
    try {
        const { productid } = req.body;
        const userid = req.user.userid;
        const wishlist = await Wishlist.findOne({ userid: userid });
        if (!wishlist) {
            return res.status(400).json({ message: "Wishlist not found" });
        }
        wishlist.products.push(productid);
        const updatedWishlist = await Wishlist.findByIdAndUpdate(wishlist._id, {
            products: wishlist.products
        });
        res.status(200).json({ message: "Product added", wishlist: updatedWishlist });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

const removeProductFromWishlist = async (req, res) => {
    try {
        const { productid } = req.body;
        const userid = req.user.userid;
        const wishlist = await Wishlist.findOne({ userid: userid });
        if (!wishlist) {
            return res.status(400).json({ message: "Wishlist not found" });
        }
        const filterProducts = wishlist.products.filter(product => product !== productid);
        const updatedWishlist = await Wishlist.findByIdAndUpdate(wishlist._id, {
            products: filterProducts
        });
        res.status(200).json({ message: "Product removed", wishlist: updatedWishlist });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

const clearWishlist = async (req, res) => {
    try {
        const userid = req.user.userid;
        const wishlist = await Wishlist.findOne({ userid: userid });
        if (!wishlist) {
            return res.status(400).json({ message: "Wishlist not found" });
        }
        const updatedWishlist = await Wishlist.findByIdAndUpdate(wishlist._id, {
            products: []
        });
        res.status(200).json({ message: "Product removed", wishlist: updatedWishlist });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

const getWishlistProducts = async (req, res) => {
    try {
        const userid = req.user.userid;
        const wishlist = await Wishlist.findOne({ userid: userid });
        const products = await Product.find({ _id: { $in: wishlist.products } });
        const wishlistDetails = wishlist.products.map(item => {
            const product = products.find(p => p._id.equals(item));
            return {
                productid: item,
                title: product.title,
                thumbnail: product.thumbnail,
                price: product.price,
                discount: product.discount,
                stock: product.stock
            }
        });
        res.status(200).json({ message: "Wishlist fetched", wishlist: wishlistDetails });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getWishlistProductsNonAuth = async (req, res) => {
    try {
        const { ids } = req.body;
        const idArr = ids ? JSON.parse(ids) : [];
        const products = await Product.find({ _id: { $in: idArr } });
        const wishlistDetails = products.map((product) => {
            return {
                productid: product._id,
                title: product.title,
                thumbnail: product.thumbnail,
                price: product.price,
                discount: product.discount,
                stock: product.stock
            }
        });
        res.status(200).json({ message: "Wishlist fetched", wishlist: wishlistDetails });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { getWishlist, addProductToWishlist, removeProductFromWishlist, clearWishlist, getWishlistProducts, getWishlistProductsNonAuth };