//createorderController.js
import { asyncHandler } from '../utils/asyncHandler.js';
import Order from '../models/Order.js';

// Process and finalize orders with automatic total amount calculation
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    const error = new Error('Cannot create order with empty cart');
    error.status = 400;
    throw error;
  }

  let totalAmount = 0;

  const updatedItems = items.map((item) => {
    totalAmount += item.price * item.quantity;
    return item;
  });

  const order = new Order({
    orderNumber: 'ORD-' + Date.now(),
    user: req.userId,
    items: updatedItems,
    totalAmount,
    shippingAddress,
    paymentMethod,
  });

  await order.save();

  res.status(201).json({
    success: true,
    order,
  });
});