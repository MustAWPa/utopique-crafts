// backend/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add to cart
router.post('/', cartController.addToCart);

// View cart
router.get('/', cartController.getCart);

// Update cart item quantity
router.put('/:id', cartController.updateCartItem);

// Remove from cart
router.delete('/:id', cartController.removeFromCart);

module.exports = router;
