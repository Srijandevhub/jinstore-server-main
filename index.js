const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const databaseConfig = require('./config/databaseConfig');
const path = require('path');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser({ origin: "http://localhost:5173" }));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT;
const url = process.env.MONGO_URL;
databaseConfig(url);

app.use("/api/v1/user", require('./routes/userRoutes'));
app.use("/api/v1/category", require('./routes/categoryRoutes'));

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})