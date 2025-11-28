import express from 'express';
import { foodRequestController } from '../controllers/foodRequestController.js';

const router = express.Router();

router.post('/', foodRequestController.createFoodRequest);
router.get('/', foodRequestController.getAllFoodRequests);
router.get('/phone/:phone', foodRequestController.getFoodRequestsByPhone); // Changed route
router.get('/:id', foodRequestController.getFoodRequestById);
router.delete('/:id', foodRequestController.delFoodRequests);
router.put('/:id', foodRequestController.updateRequestPicked);

export default router;