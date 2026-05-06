import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    const error = new Error('Authorization token is required');
    error.status = 401;
    return next(error);
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    const error = new Error('Server configuration error: JWT_SECRET not set');
    error.status = 500;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.status = 401;
      error.message = 'Token has expired';
    } else {
      error.status = 401;
      error.message = 'Invalid authorization token';
    }
    next(error);
  }
};

export const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
    } catch (error) {
      // Optional authentication: user context not required
    }
  }
  next();
};
