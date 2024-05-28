require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 5000;
const DB_NAME = 'N-PassVault';
const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', authRoutes);

mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)
.then(() =>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
