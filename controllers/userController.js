const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Wishlist = require('../models/wishlistModel');
const Billingaddress = require('../models/billingaddressModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password, cart, wishlist } = req.body;
        const userExists = await User.findOne({ $or: [ { username: username }, { email: email } ] });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password)) {
            return res.status(400).json({ message: "The password should be 8 characters long & should have atleast one capital letter, one number, & one special character" });
        }
        const cartArr = cart ? JSON.parse(cart) : [];
        const wishlistArr = wishlist ? JSON.parse(wishlist) : [];
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username: username, email: email, password: hashedpassword });
        const newCart = new Cart({ userid: newUser._id, products: cartArr });
        const newWishlist = new Wishlist({ userid: newUser._id, products: wishlistArr });
        newUser.cartid = newCart._id;
        newUser.wishlistid = newWishlist._id;
        const newBillingaddress = new Billingaddress({ userid: newUser._id, email: email });
        newUser.billingaddressid = newBillingaddress._id;
        await newUser.save();
        await newCart.save();
        await newWishlist.save();
        await newBillingaddress.save();
        res.status(200).json({ message: "User registered", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
<<<<<<< HEAD
        const { identifier, password, rememberme, wishlist, cart } = req.body;
        const user = await User.findOne({ $or: [ { username: identifier }, { email: identifier } ] });
=======
        const { identifier, password, rememberme } = req.body;
        const user = await User.findOne({ $or: [ { username: identifier }, { email: identifier } ] }).select("-shippingdetailsids	-orderids -cartid -wishlistid -billingaddressid");
>>>>>>> srijan
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const matchPassword = bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Wrong password!" });
        }
        if (wishlist) {
            const wishlistExisting = await Wishlist.findById(user.wishlistid);
            const wishlistArr = JSON.parse(wishlist);
            await Wishlist.findByIdAndUpdate(user.wishlistid, {
                products: [...wishlistExisting.products, ...wishlistArr]
            });
        }
        if (cart) {
            const cartExisting = await Cart.findById(user.cartid);
            const cartArr = JSON.parse(cart);
            await Cart.findByIdAndUpdate(user.cartid, {
                products: [...cartExisting.products, ...cartArr]
            });
        }
        const usertoken = jwt.sign({ userid: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const refreshtoken = jwt.sign({ userid: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        res.cookie("jinstoreuser", usertoken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        if (rememberme) {
            res.cookie("jinstorerefresh", refreshtoken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        }
<<<<<<< HEAD
=======
        user.password = "";
>>>>>>> srijan
        res.status(200).json({ message: "User loggedin", user: user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getLoggedinUser = async (req, res) => {
    try {
        const userid = req.user.userid;
        const user = await User.findById(userid).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        res.status(200).json({ message: "User fetched", user: user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const adminAuthProtected = async (req, res) => {
    try {
        res.status(200).json({ message: "Admin authenticated" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("jinstoreuser");
        res.clearCookie("jinstorerefresh");
        res.status(200).json({ message: "User loggedout" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { registerUser, loginUser, getLoggedinUser, adminAuthProtected, logoutUser };