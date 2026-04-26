import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Enable sellers to list new products with details and inventory management
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category, stock, images, location, tags } = req.body;

  const product = new Product({
    title,
    description,
    price,
    originalPrice: price,
    category,
    stock,
    images,
    location,
    tags,
    seller: req.userId,
  });

  await product.save();

  res.status(201).json({
    message: 'Product created successfully',
    product,
  });
});

// Browse and filter products by category, price range, search terms with pagination
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category, search, minPrice, maxPrice, status = 'active' } = req.query;

  const filter = { status };

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const products = await Product.find(filter)
    .populate('seller', 'name email phone')
    .sort({ createdAt: -1 });

  res.status(200).json({ products });
});

// Retrieve detailed information for a specific product including seller details
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('seller', 'name email phone');

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  res.status(200).json({ product });
});

// Allow sellers to modify their product listings with authorization verification
export const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stock, images, status, tags } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  if (product.seller.toString() !== req.userId) {
    const error = new Error('Unauthorized to modify this product');
    error.status = 403;
    throw error;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { title, description, price, stock, images, status, tags, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: 'Product updated successfully',
    product: updatedProduct,
  });
});

// Enable sellers to remove their products from marketplace permanently
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  if (product.seller.toString() !== req.userId) {
    const error = new Error('Unauthorized to delete this product');
    error.status = 403;
    throw error;
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'Product deleted successfully' });
});

// Retrieve all products listed by a specific seller with seller information
export const getProductsBySeller = asyncHandler(async (req, res) => {
  const products = await Product.find({ seller: req.params.sellerId }).populate('seller', 'name email phone');

  res.status(200).json({ products });
});

export{createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductsBySeller};