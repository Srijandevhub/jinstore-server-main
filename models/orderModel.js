const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    grandtotal: { type: Number },
    status: { type: String, enum: ["pending", "confirmed", "out", "delivered"], default: "pending" },
    items: [
        {
            productid: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number },
            price: { type: Number },
            discount: { type: Number }
        }
    ],
    billingaddressid: { type: mongoose.Schema.Types.ObjectId, ref: "billingaddresses" },
    shippingdetailsid: { type: mongoose.Schema.Types.ObjectId, ref: "shippingdetails" }
}, { timestamps: true });
const Order = mongoose.model("orders", orderSchema);
module.exports = Order;