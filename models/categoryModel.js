const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    thumbnail: { type: String }
}, { timestamps: true })

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;