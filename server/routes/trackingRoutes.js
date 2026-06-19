import express from 'express';
import {
  getBusTracking,
  updateBusLocation,
  getAllTracking,
  getBusesOnMap,
  getTrackingHistory,
} from '../controllers/trackingController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllTracking);
router.get('/map', protect, getBusesOnMap);
router.get('/:busId', protect, getBusTracking);
router.put('/:busId', adminOnly, updateBusLocation);
router.get('/:busId/history', protect, getTrackingHistory);

export default router;
