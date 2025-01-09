const Product = require('../models/productModel');

const productModifier = async () => {
    try {
        await Product.updateMany({}, { $set: { stock: 10 } });
    } catch (error) {
        console.log(error);
    }
}

module.exports = productModifier;