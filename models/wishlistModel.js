const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'products' } ]
}, { timestamps: true })

const Wishlist = mongoose.model("wishlists", wishlistSchema);
module.exports = Wishlist;