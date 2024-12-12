import { Router } from "express";
import Cart from "../models/cartSchema.js";
import { authMiddleware } from "../middleware/authenticateToken.js";

const router = Router();

router.get('/carts', authMiddleware, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cart' });
    }
  });

router.post('/carts', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;
    
    const userId = req.user.id;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            // If cart exists for the user, update it
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                // If product exists in the cart, update the quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // If product does not exist in the cart, add it
                cart.items.push({ productId, quantity });
            }
        } else {
            // If no cart exists for the user, create a new cart
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add to cart', details: error });
    }
});

// Delete from Cart
router.delete('/carts/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;
    try {
      let cart = await Cart.findOne({ userId });
      
      if (cart) {
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete from cart', details: error });
    }
  });
  

export default router;