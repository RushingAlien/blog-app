const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Use environment variable for MongoDB connection string
const mongoURI = process.env.MONGODB_URI || 'mongodb://admin:adminpassword@127.0.0.1:27017/blog?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.3.0';

// MongoDB connection
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Routes
app.use('/', postRoutes);
app.use(express.static('public'));

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});