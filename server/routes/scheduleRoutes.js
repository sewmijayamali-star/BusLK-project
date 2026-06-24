import express from 'express';
import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  searchSchedules,
} from '../controllers/scheduleController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSchedules);
router.get('/search', searchSchedules);
router.get('/:id', getScheduleById);
router.post('/', adminOnly, createSchedule);
router.put('/:id', adminOnly, updateSchedule);
router.delete('/:id', adminOnly, deleteSchedule);

export default router;
