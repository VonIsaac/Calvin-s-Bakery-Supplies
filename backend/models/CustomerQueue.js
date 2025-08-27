const mongoose = require("mongoose");

const CustomerQueueSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  customerInfo: {
    name: String,
    address: String,
    phoneNumber: String,
    pickupDate: Date,
  },
  user: {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("CustomerQueue", CustomerQueueSchema);
