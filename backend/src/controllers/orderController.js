import Order from '../models/Order.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Process new orders with order generation and transaction recording
const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

  const orderNumber = `ORD-${Date.now()}`;

  const order = new Order({
    orderNumber,
    user: req.userId,
    items,
    totalAmount,
    shippingAddress,
    paymentMethod,
  });

  await order.save();

  res.status(201).json({
    message: 'Order created successfully',
    order,
  });
});

// Fetch all orders placed by the authenticated user with product details
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.userId })
    .populate('items.product')
    .sort({ createdAt: -1 });

  res.status(200).json({ orders });
});

// Retrieve specific order details with ownership verification
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');

  if (!order) {
    const error = new Error('Order not found');
    error.status = 404;
    throw error;
  }

  if (order.user.toString() !== req.userId) {
    const error = new Error('Unauthorized to access this order');
    error.status = 403;
    throw error;
  }

  res.status(200).json({ order });
});

// Update order status and tracking information for shipment management
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, trackingNumber } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus, trackingNumber, updatedAt: Date.now() },
    { new: true }
  );

  if (!order) {
    const error = new Error('Order not found');
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    message: 'Order updated successfully',
    order,
  });
});

// Retrieve all orders across platform with user and product information (admin)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email phone')
    .populate('items.product')
    .sort({ createdAt: -1 });

  res.status(200).json({ orders });
});

export{createOrder, getUserOrders, getOrderById, updateOrderStatus, getAllOrders};
