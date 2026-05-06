import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/marketplace';

  if (!process.env.MONGODB_URI) {
    console.warn('[Database] MONGODB_URI is not defined. Falling back to local MongoDB at mongodb://127.0.0.1:27017/marketplace');
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✓ MongoDB Connected Successfully');
  return mongoose.connection;
};

export default connectDB;
