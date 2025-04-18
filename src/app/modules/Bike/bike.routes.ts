import express from 'express';
import { bikeController } from './bike.controller';

const router = express.Router();

router.post('/', bikeController.addANewBike);

router.get('/', bikeController.getAllBikes);

router.get('/:id', bikeController.getBikeByID);

// router.put('/:id', bikeController.updateBikeByID);

// router.delete('/:id', bikeController.deleteBikeByID);

export const bikeRoutes = router;
