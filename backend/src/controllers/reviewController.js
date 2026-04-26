import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Allow users to submit product reviews with automatic product rating calculation
export const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment } = req.body;

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
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.status(200).json({ reviews });
});

// Enable users to edit their product reviews with authorization check
export const updateReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;

  const review = await Review.findById(req.params.id);

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
    req.params.id,
    { rating, title, comment },
    { new: true }
  );

  res.status(200).json({
    message: 'Review updated successfully',
    review: updatedReview,
  });
});

// Allow users to remove their reviews from products
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

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

  await Review.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'Review deleted successfully' });
});

export{createReview, getProductReviews, updateReview, deleteReview};