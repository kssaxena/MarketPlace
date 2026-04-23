import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== USER APIs ====================

export const userAPI = {
  // Register user
  register: (userData) =>
    apiClient.post('/users/register', userData),

  // Login user
  login: (email, password) =>
    apiClient.post('/users/login', { email, password }),

  // Get user profile
  getProfile: () =>
    apiClient.get('/users/profile'),

  // Update user profile
  updateProfile: (userData) =>
    apiClient.put('/users/profile', userData),

  // Get all users (admin)
  getAllUsers: () =>
    apiClient.get('/users'),
};

// ==================== PRODUCT APIs ====================

export const productAPI = {
  // Get all products with filters
  getAllProducts: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.status) params.append('status', filters.status);

    return apiClient.get(`/products?${params.toString()}`);
  },

  // Get product by ID
  getProductById: (productId) =>
    apiClient.get(`/products/${productId}`),

  // Create product
  createProduct: (productData) =>
    apiClient.post('/products', productData),

  // Update product
  updateProduct: (productId, productData) =>
    apiClient.put(`/products/${productId}`, productData),

  // Delete product
  deleteProduct: (productId) =>
    apiClient.delete(`/products/${productId}`),

  // Get products by seller
  getProductsBySeller: (sellerId) =>
    apiClient.get(`/products/seller/${sellerId}`),
};

// ==================== ORDER APIs ====================

export const orderAPI = {
  // Create order
  createOrder: (orderData) =>
    apiClient.post('/orders', orderData),

  // Get user orders
  getUserOrders: () =>
    apiClient.get('/orders'),

  // Get order by ID
  getOrderById: (orderId) =>
    apiClient.get(`/orders/${orderId}`),

  // Update order status
  updateOrderStatus: (orderId, statusData) =>
    apiClient.put(`/orders/${orderId}`, statusData),

  // Get all orders (admin)
  getAllOrders: () =>
    apiClient.get('/orders/admin/all'),
};

// ==================== REVIEW APIs ====================

export const reviewAPI = {
  // Get product reviews
  getProductReviews: (productId) =>
    apiClient.get(`/reviews/product/${productId}`),

  // Create review
  createReview: (reviewData) =>
    apiClient.post('/reviews', reviewData),

  // Update review
  updateReview: (reviewId, reviewData) =>
    apiClient.put(`/reviews/${reviewId}`, reviewData),

  // Delete review
  deleteReview: (reviewId) =>
    apiClient.delete(`/reviews/${reviewId}`),
};

export default apiClient;
