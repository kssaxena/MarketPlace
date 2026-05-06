import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Price cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100'],
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'Electronics',
        'Clothing',
        'Home & Garden',
        'Sports',
        'Toys & Games',
        'Books',
        'Health & Beauty',
        'Furniture',
        'Automotive',
        'Other',
      ],
    },
    images: [
      {
        url: String,
        altText: String,
        required: true,
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      trim: true,
      enum: ['active', 'inactive', 'sold', 'archived'],
      default: 'active',
    },
    tags: [String],
    location: {
      type: String,
      trim: true,
    },
  }
  ,{ timestamps: true }
);

export default mongoose.model('Product', productSchema);
