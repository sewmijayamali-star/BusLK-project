import express from 'express';
import {
  getAllBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
} from '../controllers/busController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllBuses);
router.get('/:id', getBusById);
router.post('/', adminOnly, createBus);
router.put('/:id', adminOnly, updateBus);
router.delete('/:id', adminOnly, deleteBus);

export default router;
