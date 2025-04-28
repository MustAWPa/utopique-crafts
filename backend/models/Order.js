// backend/models/Order.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
    // Example: [{ product_id: 1, quantity: 2 }, { product_id: 3, quantity: 1 }]
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending', // Orders start as Pending
  },
}, {
  timestamps: true, // Sequelize automatically adds createdAt and updatedAt
});

module.exports = Order;
