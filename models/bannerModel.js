const mongoose = require('mongoose');
const bannerSchema = new mongoose.Schema({
    image: { type: String },
    heading: { type: String },
    description: { type: String },
    slug: { type: String }
}, { timestamps: true })

const Banner = mongoose.model("banners", bannerSchema);
module.exports = Banner;