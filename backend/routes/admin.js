const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin')


router.post('/post-product', adminController.postProduct);
router.put('/update-product/:id', adminController.postUpdateProduct);
module.exports = router;