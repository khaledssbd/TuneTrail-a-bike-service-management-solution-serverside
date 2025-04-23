import express from 'express';
import { serviceController } from './service.controller';

const router = express.Router();

router.post('/', serviceController.addANewService);

router.get('/', serviceController.getAllServices);

router.get('/status', serviceController.getOverdueServices);

router.get('/:id', serviceController.getServiceByID);

router.put('/:id/complete', serviceController.markServiceCompletedByID);

// router.delete('/:id', serviceController.deleteServiceByID);

export const serviceRoutes = router;
