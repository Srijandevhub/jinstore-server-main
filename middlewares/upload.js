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

<<<<<<< HEAD
const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const productDir = path.join(__dirname, "../uploads/products");
        if (!fs.existsSync(productDir)) {
            fs.mkdir(productDir);
        }
        cb(null, productDir);
=======
const bannerstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const bannerDir = path.join(__dirname, "../uploads/banners");
        if (!fs.existsSync(bannerDir)) {
            fs.mkdirSync(bannerDir, { recursive: true });
        }
        cb(null, bannerDir);
>>>>>>> srijan
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
<<<<<<< HEAD
});

const productUpload = multer({ storage: productStorage })

module.exports = { categoryUpload, productUpload };
=======
})

const bannerUpload = multer({ storage: bannerstorage });

module.exports = { categoryUpload, bannerUpload };
>>>>>>> srijan
