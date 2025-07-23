const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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
                 required: true 
            },
        }
    ],
    totalAmount: {
         type: Number, 
         required: true 
        },

    deliveryMode: { 
        type: String, 
        enum: ['pickup', 'delivery'], 
        default: 'pickup' 
    },
    deliveryCharge: { 
        type: Number, 
        default: 0 
    },
    customerInfo: {
        name: { 
            type: String, 
            required: true 
        },
        address: { 
            type: String,
            required: true 
        },
        phoneNumber: {
             type: String, 
             required: true 
            },
        pickupDate: { 
            type: Date, 
            required: true 
        }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
