import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    const error = new Error('MONGODB_URI is not defined in environment variables');
    error.status = 500;
    throw error;
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✓ MongoDB Connected Successfully');
  return mongoose.connection;
};

export default connectDB;
