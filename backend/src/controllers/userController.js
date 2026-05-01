import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/tokenUtils.js';

// Register new user with validation and password encryption
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Prevent duplicate email registrations
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email address is already registered');
    error.status = 400;
    throw error;
  }

  const user = new User({ name, email, password, phone });
  await user.save();

  const token = generateToken(user._id);

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// Authenticate user and issue JWT token
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.status = 400;
    throw error;
  }

  // Retrieve user with password field (explicitly selected in schema)
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // Verify password using bcrypt comparison
  const isValidPassword = await user.matchPassword(password);
  if (!isValidPassword) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const token = generateToken(user._id);

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// Retrieve authenticated user's profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error('User profile not found');
    error.status = 404;
    throw error;
  }
  res.status(200).json({ user });
});

// Update user profile information
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, phone, address, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userId,
    { name, phone, address, avatar, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: 'Profile updated successfully',
    user,
  });
});

// Retrieve all users (admin operation)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({ users });
});

export{registerUser, loginUser, getUserProfile, updateUserProfile, getAllUsers};