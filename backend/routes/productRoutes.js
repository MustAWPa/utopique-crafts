// backend/routes/productRoutes.js

// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');


// Create a new product (with image upload)
router.post('/', upload.single('image'), productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID (with image upload)
router.put('/:id', upload.single('image'), productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
