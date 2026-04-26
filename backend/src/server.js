import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './index/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

connectDB().catch((error) => {
  console.error('[Database] Connection failed:', error.message);
  process.exit(1);
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'operational', environment: NODE_ENV });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    message = errors.join(', ');
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  } else if (err.name === 'CastError') {
    message = 'Invalid resource identifier';
  }

  if (NODE_ENV === 'production') {
    console.error(`[${statusCode}] ${message}`);
  } else {
    console.error(`[Error] ${statusCode}:`, err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`[Server] Started on port ${PORT} | Environment: ${NODE_ENV}`);
});
