const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    products: [
        {
            productid: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, default: 1 }
        }
    ],
    grandtotal: { type: Number, default: 0 }
}, { timestamps: true })

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;