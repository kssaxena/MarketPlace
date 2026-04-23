// Product categories
export const PRODUCT_CATEGORIES = [
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
];

// Order status
export const ORDER_STATUS = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'returned',
];

// Payment methods
export const PAYMENT_METHODS = [
  'credit_card',
  'debit_card',
  'net_banking',
  'upi',
  'wallet',
];

// User roles
export const USER_ROLES = ['user', 'seller', 'admin'];

// Error messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'You do not have permission to access this resource',
  SERVER_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Resource not found',
};

// Success messages
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  ORDER_CREATED: 'Order created successfully',
  REVIEW_CREATED: 'Review created successfully',
};
