const express = require('express');
const router = express.Router();
const userController = require('../controller/auth');
const {authenticateToken} = require('../middleware/middleware');

router.post('/signup',  userController.postSignup);
router.post('/login',  userController.postLogin);
router.post('/cashier',  userController.postCashier);
router.get('/get-cashier-account',  userController.getCashierAccount);
router.delete('/get-cashier-account/:id',  userController.deleteCashierAccount)
router.get('/me', authenticateToken, userController.getMe);

module.exports = router;