// backend/controllers/orderController.js

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendOrderConfirmationEmail } = require('../services/emailService');

// Place an order (checkout)
exports.placeOrder = async (req, res) => {
    try {
      const { products, total_price } = req.body;
  
      // Validate request
      if (!products || products.length === 0) {
        return res.status(400).json({ error: 'No products provided.' });
      }
      if (!total_price || total_price <= 0) {
        return res.status(400).json({ error: 'Invalid total price.' });
      }
  
      // Create the order with the user ID from JWT token
      const order = await Order.create({
        user_id: req.user.userId,   // ✅ Link the order to the user placing it
        products,
        total_price,
        status: 'Pending',          // Default initially until payment confirmed
      });
  
      res.status(201).json(order);
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update Order Status to Paid
// Update Order Status to Paid
exports.updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the order by ID
      const order = await Order.findByPk(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Update order status to "Paid"
      order.status = 'Paid';
      await order.save();
  
      // Fetch the user based on user_id from the Order
      const user = await User.findByPk(order.user_id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send confirmation email to the user's real email
      await sendOrderConfirmationEmail(user.email, order.id);
  
      res.status(200).json({ message: 'Order marked as Paid successfully', order });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
