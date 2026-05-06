import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

// Allow users to submit product reviews with automatic product rating calculation
const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment } = req.body;

  // Validate if productId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    const error = new Error('Invalid product ID format');
    error.status = 400;
    throw error;
  }

  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  const review = new Review({
    product: productId,
    user: req.userId,
    rating,
    title,
    comment,
  });

  await review.save();

  const reviews = await Review.find({ product: productId });
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, {
    rating: avgRating,
    reviews: reviews.length,
  });

  res.status(201).json({
    message: 'Review created successfully',
    review,
  });
});

// Fetch all reviews for a specific product with user information
const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Validate if productId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    const error = new Error('Invalid product ID format');
    error.status = 400;
    throw error;
  }

  const reviews = await Review.find({ product: productId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.status(200).json({ reviews });
});

// Enable users to edit their product reviews with authorization check
const updateReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;
  const reviewId = req.params.id;

  // Validate if reviewId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    const error = new Error('Invalid review ID format');
    error.status = 400;
    throw error;
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    const error = new Error('Review not found');
    error.status = 404;
    throw error;
  }

  if (review.user.toString() !== req.userId) {
    const error = new Error('Unauthorized to modify this review');
    error.status = 403;
    throw error;
  }

  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { rating, title, comment },
    { new: true }
  );

  res.status(200).json({
    message: 'Review updated successfully',
    review: updatedReview,
  });
});

// Allow users to remove their reviews from products
const deleteReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;

  // Validate if reviewId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    const error = new Error('Invalid review ID format');
    error.status = 400;
    throw error;
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    const error = new Error('Review not found');
    error.status = 404;
    throw error;
  }

  if (review.user.toString() !== req.userId) {
    const error = new Error('Unauthorized to delete this review');
    error.status = 403;
    throw error;
  }

  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({ message: 'Review deleted successfully' });
});

export{createReview, getProductReviews, updateReview, deleteReview};