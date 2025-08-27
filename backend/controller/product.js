const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const CustomerQueue = require('../models/CustomerQueue')
const {sendSmsMessage} = require('../utils/smsMessage')

exports.getAllProducts = async (req, res) => {
    try {
        const category = req.query.category;
        let products;

        if (category) {
            // Filter by category and sort by expiration date (soonest first)
            products = await Product.find({ category }).sort({ expirationDate: 1 });
        } else {
            // Get all products, sorted by expiration date
            products = await Product.find().sort({ expirationDate: 1 });
        }

        console.log(products);

        return res.status(200).json({
            message: 'Get products successfully',
            products
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ error: "Failed to get products. Please try again." });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Product.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      return res.status(200).json({
        message: 'Product deleted successfully',
        product: deleted,
      });
    } catch (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Failed to delete product. Please try again.' });
    }
  };

exports.postAddToCart = async (req, res) => {
    const { productId, quantity, priceType } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(productId);

        if (!product || product.stock < quantity) {
            return res.status(400).json({ error: 'Not enough stock available.' });
        }

        if (!['price', 'halfPrice', 'retailPrice'].includes(priceType)) {
            return res.status(400).json({ error: 'Invalid price type selected' });
        }

        const selectedPrice = product[priceType];
        if (selectedPrice == null) {
            return res.status(400).json({ error: `Selected price type (${priceType}) not available for this product.` });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if item with same product and priceType exists
        const itemIndex = cart.items.findIndex(item =>
            item.product.equals(productId) && item.priceType === priceType
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, priceType, price: selectedPrice });
        }

        await cart.save();

        const populatedCart = await Cart.findOne({ user: userId }).populate('items.product');

        res.status(200).json({
            message: 'Added to cart',
            cart: populatedCart
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add to cart' });
    }
};

exports.getCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(200).json({ message: 'Cart is empty', items: [] });
        }

        res.status(200).json({
            message: 'Cart retrieved successfully',
            items: cart.items,
           
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve cart' });
    }
}



// Remove item from cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.items = cart.items.filter(item => !item.product.equals(productId));
        await cart.save();

        res.status(200).json({ message: 'Removed from cart', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
};


exports.postCheckout = async (req, res) => {
    const userId = req.user.id;
    const { name, address, phoneNumber, pickupDate, deliveryMode } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        let total = 0;
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({ error: `Not enough stock for ${item.product.name}` });
            }
            total += item.price * item.quantity; 
        }

        let deliveryCharge = 0;
        if (deliveryMode === 'delivery' && !address.toLowerCase().includes('bustos palengke')) {
            deliveryCharge = 50;
        }

        const grandTotal = total + deliveryCharge;

        for (const item of cart.items) { // Update stock for each product
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity }
            });
        }

        const order = new Order({
            user: userId,
            items: cart.items,
            totalAmount: grandTotal,
            deliveryMode,
            deliveryCharge,
            customerInfo: { name, address, phoneNumber, pickupDate }
        });

        await order.save();

        await CustomerQueue.create({
            orderId: order._id,
            customerInfo: { name, address, phoneNumber, pickupDate },
            user: { _id: req.user.id, username: req.user.username, email: req.user.email }
        });
        const populatedOrder = await Order.findById(order._id)
            .populate('user', 'username email') 
            .populate('items.product');

        await Cart.deleteOne({ user: userId });

        res.status(200).json({
            message: 'Order placed successfully',
            order: populatedOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Checkout failed' });
    }
};

exports.getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate('items.product') .populate('user', 'username email') ;
        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
}



exports.getCategorySalesAnalytics = async (req, res) => {
    try {
      const orders = await Order.find().populate('items.product');
  
      const categoryMap = {};
  
      for (const order of orders) {
        for (const item of order.items) {
            const product = item.product;
            if (!product) continue; // skip if product is not found

            const { category, name, images, stock, price, _id } = product;
            if (!categoryMap[category]) {
                categoryMap[category] = {};
            }

            if (!categoryMap[category][name]) {
                categoryMap[category][name] = {
                  _id,
                  name,
                  images,
                  stock,
                  price,
                  quantitySold: 0
                };
            }
            categoryMap[category][name].quantitySold += item.quantity;
        }
      }
  
      const result = Object.entries(categoryMap).map(([category, itemsMap]) => ({
        category,
        items: Object.values(itemsMap)
        .filter(p => p.quantitySold >= 3)
        .sort((a, b) => b.quantitySold - a.quantitySold)
    }));

    const filteredResult = result.filter(cat => cat.items.length > 0);

      res.json({ message: "Analytics generated", data: filteredResult });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch analytics", error: err.message });
    }
};

  exports.getCustomerOrdersDetails = async (req, res) => {
    try {
      const orders = await Order.find().populate('user', 'username email').populate('items.product').sort({ createdAt: 1 }); ;          
  
      res.status(200).json({
        message: 'Orders retrieved successfully',
        orders
      });
    } catch (err) {
      console.error("Error fetching customer orders:", err);
      res.status(500).json({
        message: "Failed to fetch customer orders",
        error: err.message
      });
    }
  };

exports.getCustomerInfo = async (req, res ) => {
    try{

       const queue = await CustomerQueue.find().populate({ path: "orderId",
                populate: {
                    path: "items.product",  
                    model: "product",       
                }}).populate("user._id").sort({ createdAt: 1 }); 
        if(!queue){
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({
            message: "Customer info retrieved successfully",
            customer: queue
        });
    }catch(err){
        console.error("Error fetching customer info:", err);
        res.status(500).json({
            message: "Failed to fetch customer info",
            error: err.message
        });
    }
}
exports.clearCustomerInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // find by orderId._id instead of CustomerQueue._id
    const updateOrder = await CustomerQueue.findByIdAndDelete(id);

    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Customer info cleared successfully",
      updateOrder,
    });
  } catch (err) {
    console.error("Error clearing customer info:", err);
    res.status(500).json({
      message: "Failed to clear customer info",
      error: err.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const customerOrder = await CustomerQueue.findById(id)
      .populate({
        path: "orderId",
        populate: {
          path: "items.product",
          model: "product",
        },
      });

    if (!customerOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = customerOrder.orderId;
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Determine delivery mode
    const deliveryMode = order.deliveryMode === "delivery" ? "Delivery" : "Pickup";

    let smsText = "";
    if (status === "approved") {
      const productDetails = order.items.map((item) =>
            `- ${item.product.name} (${item.quantity} pcs @ ₱${item.product.retailPrice || item.product.price || item.halfPrice})`
        ).join("\n");
      smsText = 
      `
        Hi ${customerOrder.customerInfo.name}, this is from Calvins Bakery Supplies your order has been approved! 📦
        Mode: ${deliveryMode}
        Address: ${customerOrder.customerInfo.address}
        Products:${productDetails}
        💰 Total: ₱${order.totalAmount}
        📅 ${deliveryMode} Date: ${new Date(customerOrder.customerInfo.pickupDate).toLocaleDateString()}
      `;
    } else if (status === "declined") {
      smsText =
      `
        ❌ Hello ${customerOrder.customerInfo.name},
            We’re sorry, but your order could not be processed and has been declined.
            Mode: ${deliveryMode} 
            🛒 Order Total: ₱${order.totalAmount}  
            📍 Address: ${customerOrder.customerInfo.address}  
            📅 ${deliveryMode} Date: ${new Date(customerOrder.customerInfo.pickupDate).toLocaleDateString()}  
            Please reach out to us if you’d like to reorder or need further assistance.  
            Thank you for choosing us!

      `;
    } else {
      return res.status(400).json({ message: "Invalid status" });
    }

    // format number helper
    function formatPhoneNumber(phoneNumber) {
      if (phoneNumber.startsWith("0")) {
        return "+63" + phoneNumber.slice(1);
      }
      return phoneNumber;
    }
    const formattedNumber = formatPhoneNumber(customerOrder.customerInfo.phoneNumber);

    await sendSmsMessage(smsText, [formattedNumber]);

    customerOrder.status = status;
    await customerOrder.save();

    res.status(200).json({
      message: `Order ${status} and SMS sent successfully`,
      customerOrder,
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({
      message: "Failed to update order status",
      error: err.message,
    });
  }
};