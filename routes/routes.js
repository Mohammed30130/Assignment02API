
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// GET all products
router.get('/products', productController.getAllProducts);
// GET a single product by ID
router.get('/products/:id', productController.getProductById);
// POST a new product
router.post('/products/', productController.createProduct);
// PUT (update) a product by ID
router.put('/products/:id', productController.updateProduct);
// DELETE a product by ID
router.delete('/products/:id', productController.deleteProduct);
// DELETE all products
router.delete('/products/', productController.removeAllProduct);
// Find Product
router.get('/products?name=[kw]', productController.findProduct);
module.exports = router;



module.exports = router;