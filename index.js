require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/user.js');
const webRouter = require('./router/registerWeb.js')
const config = require('./config.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '1mb' }));  // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '1mb' }));  // Parse form data
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/web", webRouter);

async function main() {
    await mongoose.connect(config.MONGODB_URI);
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${port}`);
    });
}

main();