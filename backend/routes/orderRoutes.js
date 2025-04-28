// backend/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place an order (checkout)
router.post('/', orderController.placeOrder);

// Get all orders
router.get('/', orderController.getOrders);

module.exports = router;
