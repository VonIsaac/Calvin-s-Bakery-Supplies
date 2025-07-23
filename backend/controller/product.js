const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

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
          const { category, name } = item.product;
          if (!categoryMap[category]) categoryMap[category] = {};
          if (!categoryMap[category][name]) categoryMap[category][name] = 0;
  
          categoryMap[category][name] += item.quantity;
        }
      }
  
      const result = Object.entries(categoryMap).map(([category, itemsMap]) => ({
        category,
        items: Object.entries(itemsMap).map(([name, quantitySold]) => ({ name, quantitySold }))
      }));
  
      res.json({ message: "Analytics generated", data: result });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch analytics", error: err.message });
    }
  };

  exports.getCustomerOrdersDetails = async (req, res) => {
    try {
        // Only return customerInfo field
        const customerInfos = await Order.find({}, 'customerInfo');

        res.status(200).json({
            message: 'Customer info retrieved successfully',
            customerInfos
        });
    } catch (err) {
        console.error("Error fetching customer info:", err);
        res.status(500).json({
            message: "Failed to fetch customer info",
            error: err.message
        });
    }
};