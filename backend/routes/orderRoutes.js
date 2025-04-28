// backend/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');

// Place an order (checkout)
router.post('/',  authenticateToken, orderController.placeOrder);

// Get all orders
router.get('/',  authenticateToken, orderController.getOrders);


router.put('/:id/pay', authenticateToken, orderController.updateOrderStatus);

module.exports = router;


