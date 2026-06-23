import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Uses environment variable if available,
 * otherwise falls back to local MongoDB
 */
export const connectDB = async () => {
  try {
    // MongoDB connection string
    const mongoURI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/buslk';

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      tlsAllowInvalidCertificates: true, // Allow invalid TLS certificates (development use)
    });

    // Success message
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    // Error handling
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

/**
 * Disconnect from MongoDB database
 * Used when shutting down the server
 */
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnection error:', error.message);
    process.exit(1);
  }
};