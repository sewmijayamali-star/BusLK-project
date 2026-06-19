import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('[v0] Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: 'BusLK Admin',
      email: 'admin@buslk.com',
      password: 'admin123456',
      role: 'admin',
      isActive: true,
    });

    await admin.save();
    console.log('[v0] Admin user created successfully');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: admin123456`);
    console.log('[v0] Please change this password after first login');

    process.exit(0);
  } catch (error) {
    console.error('[v0] Seed error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
