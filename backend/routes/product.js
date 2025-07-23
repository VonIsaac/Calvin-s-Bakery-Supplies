const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/middleware')
const productController = require('../controller/product');


router.get('/get-products', productController.getAllProducts);
router.post('/post-cart', authenticate, productController.postAddToCart)
router.post('/post-checkout', authenticate, productController.postCheckout);
router.post('/remove-from-cart', authenticate, productController.removeFromCart);
router.get('/get-cart', authenticate, productController.getCart);
router.get('/get-order', authenticate, productController.getOrders);
router.get('/category-sales', authenticate, productController.getCategorySalesAnalytics);
router.get('/get-user-orders', authenticate, productController.getCustomerOrdersDetails)
module.exports = router;