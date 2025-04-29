const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    console.log('======== DEBUGGING UPLOAD ========');
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);

    const { title, description, price, category, stock } = req.body;
    const image = req.file ? req.file.location : null;

    if (!image) {
      console.log('No image uploaded');
      return res.status(400).json({ message: 'Image upload failed', fileDebug: req.file });
    }

    console.log('Creating new product...');
    const product = new Product({
      title,
      description,
      price,
      category,
      stock,
      image_url: image,  // ✅ Note: image_url now
    });

    console.log('Saving product to database...');
    const createdProduct = await product.save();
    console.log('Product saved!', createdProduct);

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error while creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// ❗ ADD THIS MISSING FUNCTION
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single product by ID
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
