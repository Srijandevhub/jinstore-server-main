const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    products: [
        {
            productid: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true })

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;