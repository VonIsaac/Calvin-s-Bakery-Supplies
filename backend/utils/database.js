const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const mpngoose = require('mongoose');


const mongoDbConnect = () => {
    mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Failed to connect to the database', err);
    });
}

module.exports = mongoDbConnect;
