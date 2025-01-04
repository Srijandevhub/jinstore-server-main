const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    billingaddressid: { type: mongoose.Schema.Types.ObjectId, ref: 'billingaddresses' },
    shippingdetailsids: [ { type: mongoose.Schema.Types.ObjectId, ref: 'shippingdetails' } ],
    orderids: [ { type: mongoose.Schema.Types.ObjectId, ref: 'orders' } ],
    cartid: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    wishlistid: { type: mongoose.Schema.Types.ObjectId, ref: 'wishlists' },
}, { timestamps: true })

const User = mongoose.model("users", userSchema);
module.exports = User;