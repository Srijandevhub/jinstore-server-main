const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({
    name: { type: String }
}, { timestamps: true })

const Brand = mongoose.model("brands", brandSchema);
module.exports = Brand;