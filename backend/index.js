// backend/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Test route
app.get('/', (req, res) => {
  res.send('✅ Utopique Crafts Backend is running!');
});

// Try connecting to DB and starting server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully.');
    return sequelize.sync({ alter: true }); // Auto-create tables (for now)
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });
