import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Retrieve user's shopping cart with current items and their availability status
export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate(
    'items.product',
    'title price images stock status'
  );

  if (!cart) {
    return res.json({ success: true, items: [] });
  }

  const items = cart.items
    .filter(item => item.product && item.product.status === 'active')
    .map(item => ({
      id: item.product._id,
      name: item.product.title,
      price: item.product.price,
      qty: item.quantity,
      image: item.product.images?.[0]?.url || null,
      stock: item.product.stock,
    }));

  res.json({ success: true, items });
});

// Add products to shopping cart with quantity validation and stock availability check
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product || product.status !== 'active') {
    const error = new Error('Product not available');
    error.status = 404;
    throw error;
  }
  if (product.stock < quantity) {
    const error = new Error('Insufficient stock available');
    error.status = 400;
    throw error;
  }

  let cart = await Cart.findOne({ user: req.userId });
  if (!cart) {
    cart = new Cart({ user: req.userId, items: [] });
  }

  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json({ success: true, message: 'Added to cart' });
});

// Modify product quantity in cart with minimum quantity enforcement
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (quantity < 1) {
    const error = new Error('Quantity must be at least 1');
    error.status = 400;
    throw error;
  }

  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) {
    const error = new Error('Cart not found');
    error.status = 404;
    throw error;
  }

  const item = cart.items.find(i => i.product.toString() === productId);
  if (!item) {
    const error = new Error('Item not found in cart');
    error.status = 404;
    throw error;
  }

  item.quantity = quantity;
  await cart.save();
  res.json({ success: true, message: 'Cart updated' });
});

// Remove individual products from shopping cart
export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) {
    const error = new Error('Cart not found');
    error.status = 404;
    throw error;
  }

  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await cart.save();
  res.json({ success: true, message: 'Item removed from cart' });
});

// Empty the entire shopping cart of all items
export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.userId });
  res.json({ success: true, message: 'Cart cleared' });
});