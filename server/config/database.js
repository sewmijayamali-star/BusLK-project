import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/buslk';

    await mongoose.connect(mongoURI, {
  tlsAllowInvalidCertificates: true
});

    console.log('[v0] MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('[v0] MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('[v0] MongoDB disconnected');
  } catch (error) {
    console.error('[v0] MongoDB disconnection error:', error.message);
    process.exit(1);
  }
};
