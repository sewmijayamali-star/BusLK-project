import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  confirmBooking,
  getAllBookings,
  getBookedSeats,
} from '../controllers/bookingController.js';
import { protect, adminOnly, authWithRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/admin/all', adminOnly, getAllBookings);
router.get('/seats/:scheduleId', getBookedSeats);
router.get('/:id', authWithRole, getBookingById);
router.post('/:id/confirm', protect, confirmBooking);
router.delete('/:id', protect, cancelBooking);

export default router;
