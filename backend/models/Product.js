
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    
});

module.exports = mongoose.model('product', ProductSchema);