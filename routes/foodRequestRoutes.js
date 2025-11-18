import express from 'express';
import { foodRequestController } from '../controllers/foodRequestController.js';

const router = express.Router();

router.post('/', foodRequestController.createFoodRequest);
router.get('/', foodRequestController.getAllFoodRequests);
router.get('/:id', foodRequestController.getFoodRequestById);
router.get('/', foodRequestController.getFoodRequestsByPhone);

export default router;