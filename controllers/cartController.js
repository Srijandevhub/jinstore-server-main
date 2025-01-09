const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const getCart = async (req, res) => {
    try {
        const userid = req.user.userid;
        const cart = await Cart.findOne({ userid: userid });
        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart fetched", cart: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
const addProductToCart = async (req, res) => {
    try {
        const { productid, quantity = 1 } = req.body;
        const userid = req.user.userid;
        const cart = await Cart.findOne({ userid: userid });
        cart.products.push({
            productid: productid,
            quantity: quantity
        });
        const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
            products: cart.products
        });
        res.status(200).json({ message: "Product added", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const removeProductFromCart = async (req, res) => {
    try {
        const { productid } = req.body;
        const userid = req.user.userid;
        const cart = await Cart.findOne({ userid: userid });
        const filteredCart = cart.products.filter(product => product.productid !== productid);
        const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
            products: filteredCart
        });
        res.status(200).json({ message: "Product removed", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const updateQuantity = async (req, res) => {
    try {
        const { productid, quantity } = req.body;
        const userid = req.user.userid;
        const cart = await Cart.findOne({ userid: userid });
        cart.products.find(product => product.productid === productid).quantity = quantity;
        const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
            products: cart.products
        });
        res.status(200).json({ message: "Quantity", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const clearCart = async (req, res) => {
    try {
        const userid = req.user.userid;
        const cart = await Cart.findOne({ userid: userid }).select("-products");
        const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
            products: []
        });
        res.status(200).json({ message: "Quantity", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getCartProductsFromAuth = async (req, res) => {
    try {
        const userid = req.user.userid;
        const cart = await Cart.findOne({ userid: userid });
        const productidArr = cart.products.map((product) => product.productid);
        const products = await Product.find({ _id: { $in: productidArr } });
        const cartDetails = cart.products.map((item) => {
            const product = products.find(p => p._id.equals(item.productid));
            return {
                productid: item.productid,
                quantity: item.quantity,
                title: product.title,
                thumbnail: product.thumbnail,
                price: product.price,
                discount: product.discount,
                stock: product.stock
            }
        });
        res.status(200).json({ message: "Cart products fetched", cart: cartDetails });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getProductsFromNonAuth = async (req, res) => {
    try {
        const { products } = req.body;
        const productsArr = ids ? JSON.parse(ids) : [];
        const idArr = productsArr.map(product => product.productid);
        const productsFind = await Product.find({ _id: { $in: idArr } });
        const cartDetails = productsArr.map((item) => {
            const product = productsFind.find(p => p._id.equals(item.productid));
            return {
                productid: item.productid,
                quantity: item.quantity,
                title: product.title,
                thumbnail: product.thumbnail,
                price: product.price,
                discount: product.discount,
                stock: product.stock
            }
        })
        res.status(200).json({ message: "Cart products fetched", cart: cartDetails });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { getCart, addProductToCart, removeProductFromCart, updateQuantity, getCartProductsFromAuth, getProductsFromNonAuth, clearCart }