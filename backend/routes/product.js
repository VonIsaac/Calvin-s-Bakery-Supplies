const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/middleware')
const productController = require('../controller/product');


router.get('/get-products', productController.getAllProducts);
router.delete('/delete-product/:id', authenticate, productController.deleteProduct);
router.post('/post-cart', authenticate, productController.postAddToCart)
router.post('/post-checkout', authenticate, productController.postCheckout);
router.post('/remove-from-cart', authenticate, productController.removeFromCart);
router.get('/get-cart', authenticate, productController.getCart);
router.get('/get-order', authenticate, productController.getOrders);
router.get('/category-sales', authenticate, productController.getCategorySalesAnalytics);
router.get('/get-user-orders', authenticate, productController.getCustomerOrdersDetails);
router.get('/get-customer-info', authenticate, productController.getCustomerInfo);
router.delete('/clear-customer-info/:id', authenticate, productController.clearCustomerInfo);
router.put('/customer-order/:id/status', authenticate, productController.updateOrderStatus);
module.exports = router;