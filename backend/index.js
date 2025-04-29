// backend/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
require('dotenv').config();
require('./models/Product');
require('./models/Cart');
require('./models/Order');
require('./models/User');

const cartRoutes = require('./routes/cartRoutes'); 
const orderRoutes = require('./routes/orderRoutes');


const productRoutes = require('./routes/productRoutes'); 
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.json());
const multer = require('multer');
const path = require('path');




// Serve uploads folder as static
app.use('/uploads', express.static('uploads'));


app.use(cors());
app.use(helmet());

// Use product routes
app.use('/products', productRoutes); 
app.use('/cart', cartRoutes); 
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);
app.use('/payment', paymentRoutes);




// Test route
app.get('/', (req, res) => {
  res.send('✅ Utopique Crafts Backend is running!');
});

// Try connecting to DB and starting server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });


