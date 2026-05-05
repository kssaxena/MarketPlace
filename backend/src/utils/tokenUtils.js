import jwt from 'jsonwebtoken';

// Generate JWT token for user authentication
export const generateToken = (userId) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured. Please set JWT_SECRET in .env file');
  }
  
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  });
};
