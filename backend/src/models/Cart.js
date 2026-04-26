import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// 🔥 GET CART (with populate)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product");

    const items = cart?.items.map(item => ({
      id: item.product._id,
      title: item.product.title,
      price: item.product.price,
      image: item.product.image,
      qty: item.quantity
    })) || [];

    res.json({ success: true, items });

  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
});


// ➕ ADD TO CART
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { product, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [{ product, quantity }]
      });
    } else {
      const existing = cart.items.find(
        item => item.product.toString() === product
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }
    }

    await cart.save();
    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false, message: "Add to cart failed" });
  }
});


// 🔄 UPDATE QUANTITY
router.put("/:productId", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find(
      i => i.product.toString() === req.params.productId
    );

    if (item) item.quantity = quantity;

    await cart.save();
    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});


// ❌ REMOVE ITEM
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    cart.items = cart.items.filter(
      i => i.product.toString() !== req.params.productId
    );

    await cart.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});


// 🧹 CLEAR CART
router.delete("/", authMiddleware, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

export default router;