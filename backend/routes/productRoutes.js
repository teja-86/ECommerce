import { Router } from "express";
import Product from '../models/productSchema.js';


const router = Router();

// Product Management
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.post('/products', async (req, res) => {
    const { name, price, image, rating, description } = req.body;
    try {
      const product = new Product({ name, price, image, rating, description });
      await product.save();
      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to add product', details: error });
    }
  });

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
      }
});


// router.post('/products', authenticateToken, authorizeAdmin, async (req, res) => {
//     const { name, description, price, stock } = req.body;
//     try {
//         const product = new Product({ name, description, price, stock });
//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({ error: 'Failed to add product', details: error });
//     }
// });


export default router;