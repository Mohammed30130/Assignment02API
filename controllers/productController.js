const Product = require('../models/product');

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products' });
  }
};
// GET a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product' });
  }
};
// POST a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  try {
    const product = new Product({ name, description, price, quantity, category });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};
// PUT (update) a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.category = category;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};
// DELETE a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
// DELETE all products
exports.removeAllProduct = async (req, res) => {
  Product.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while deleting all products');
    } else {
      res.send('All products have been deleted');
    }
  });
};
// GET products by name
exports.findProduct = async (req, res) => {
  const keyword = req.query.name;
  Product.find({ name: { $regex: keyword, $options: 'i' } }, (err, products) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while searching for products');
    } else {
      
      res.json(products);
    }
  });
};