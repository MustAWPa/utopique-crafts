// backend/controllers/orderController.js

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Place an order (checkout)
exports.placeOrder = async (req, res) => {
  try {
    // Fetch all cart items
    const cartItems = await Cart.findAll();

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Prepare products array and calculate total price
    let products = [];
    let totalPrice = 0;

    for (const item of cartItems) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        continue; // Skip if product no longer exists
      }

      products.push({
        product_id: product.id,
        title: product.title,
        quantity: item.quantity,
        price: product.price
      });

      totalPrice += product.price * item.quantity;
    }

    // Create the order
    const order = await Order.create({
      products,
      total_price: totalPrice,
      status: 'Pending'
    });

    // Clear the cart after order is placed
    await Cart.destroy({ where: {} });

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
