// backend/controllers/productController.js



// Create a new product
const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    // ✅ Parse price and stock into correct types
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    // ✅ Handle uploaded image
    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    // ✅ Create product
    const product = await Product.create({
      title,
      description,
      price: parsedPrice,
      category,
      stock: parsedStock,
      image_url: imageUrl,  // ✅ Save image_url here
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image_url, category, stock } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({ title, description, price, image_url, category, stock });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
