const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const databaseConfig = require('./config/databaseConfig');
const path = require('path');
//const productModifier = require('./config/productModifier');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(cookieParser({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.disable("etag");
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT;
const url = process.env.MONGO_URL;
databaseConfig(url);

app.use("/api/v1/user", require('./routes/userRoutes'));
app.use("/api/v1/category", require('./routes/categoryRoutes'));
app.use("/api/v1/brand", require('./routes/brandRoutes'));
app.use("/api/v1/product", require('./routes/productRoutes'));
app.use("/api/v1/wishlist", require('./routes/wishlistRoutes'));
app.use("/api/v1/cart", require('./routes/cartRoutes'));
app.use("/api/v1/banner", require("./routes/bannerRoutes"));
app.use("/api/v1/order", require('./routes/orderRoute'));

//productModifier();

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})