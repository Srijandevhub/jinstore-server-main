const multer = require('multer');
const path = require('path');
const fs = require('fs');

const categorystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const categoryDir = path.join(__dirname, '../uploads/categories');
        if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir, { recursive: true });
        }
        cb(null, categoryDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const categoryUpload = multer({ storage: categorystorage });

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const productDir = path.join(__dirname, "../uploads/products");
        if (!fs.existsSync(productDir)) {
            fs.mkdir(productDir);
        }
        cb(null, productDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const productUpload = multer({ storage: productStorage })

module.exports = { categoryUpload, productUpload };