const express = require('express');
const app = express();
const port = 5000;

const dbconnect = require('./db/dbconnect');
const web = require('./routes/web');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// Load environment variables from .env
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'dsprbnpqo',
  api_key: process.env.CLOUD_API_KEY || '129264287522167',
  api_secret: process.env.CLOUD_API_SECRET || 'r_W_mc5cI544aSDc_mq7ucukfss'
});

// Middlewares
app.use(cors({ }));
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true
}));

// Connect to DB
dbconnect();

// Routes
app.use('/api', web);

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
