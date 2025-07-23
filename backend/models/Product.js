
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
    expirationDate:{
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    halfPrice: {
        type: Number,
        
    },
    retailPrice:{
        type: Number,
        
    },
    category:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true,
        min: 0
    }

    
});

module.exports = mongoose.model('product', ProductSchema);