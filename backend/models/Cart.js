const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [
        {
            product: { 
                type: Schema.Types.ObjectId, 
                ref: 'product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true, 
                min: 1 
            },
            priceType: { 
                type: String, 
                enum: ['price', 'halfPrice', 'retailPrice'], 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ]
});

module.exports = mongoose.model('Cart', CartSchema);