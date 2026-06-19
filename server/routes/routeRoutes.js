import express from 'express';
import {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController.js';
import { adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllRoutes);
router.get('/:id', getRouteById);
router.post('/', adminOnly, createRoute);
router.put('/:id', adminOnly, updateRoute);
router.delete('/:id', adminOnly, deleteRoute);

export default router;
