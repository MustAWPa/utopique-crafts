// backend/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // No two users can have the same email
    validate: {
      isEmail: true, // Validate it's a real email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // This will store hashed password
  },
}, {
  timestamps: true, // Auto adds createdAt and updatedAt
});

module.exports = User;
