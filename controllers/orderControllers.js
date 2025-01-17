const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require("../models/productModel");
const createOrder = async (req, res) => {
    try {
        const { shippingdetailsid } = req.body;
        const userid = req.user.userid;
        const billingaddressid = req.user.billingaddressid;
        const cart = await Cart.findOne({ userid: userid });
        const productids = cart.products.map(item => item.productid);
        const products = await Product.find({ $in: productids });
        const items = products.map((product) => {
            const cartItem = cart.products.find(cart => cart.productid.toString() === product._id.toString());
            return {
                productid: product._id,
                quantity: cartItem.quantity,
                price: product.price,
                discount: product.discount
            }
        })
        const newOrder = new Order({
            userid: userid,
            grandtotal: cart.grandtotal + 30 + 1 + (cart.grandtotal * (18 / 100)),
            items: items,
            billingaddressid: billingaddressid,
            shippingdetailsid: shippingdetailsid
        });
        await newOrder.save();
        res.status(200).json({ message: "Order created", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { createOrder }