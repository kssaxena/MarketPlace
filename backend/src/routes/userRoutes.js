import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, getAllUsers } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

// Admin routes
router.get('/', authMiddleware, getAllUsers);

export default router;
