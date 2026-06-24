import express from 'express';
import { register, login, getProfile, updateProfile, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

// Create router
const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Protected user routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

// Export router
export default router;