const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    rating: { type: Number, min: 1, max: 5, default: 1 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const productSchema = new mongoose.Schema({
    brandid: { type: mongoose.Schema.Types.ObjectId, ref: 'brands' },
    title: { type: String },
    shortdescription: { type: String },
    description: { type: String },
    sku: { type: String },
    price: { type: Number },
    discount: { type: Number },
    isorganic: { type: Boolean, default: false },
    thumbnail: { type: String },
    images:  [ { type: String } ],
    categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    reviews: [reviewSchema]
}, { timestamps: true })

const Product = mongoose.model('products', productSchema);
module.exports = Product;