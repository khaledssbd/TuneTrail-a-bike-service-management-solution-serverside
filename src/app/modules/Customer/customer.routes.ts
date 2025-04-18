import express from 'express';
import { customerController } from './customer.controller';

const router = express.Router();

router.post('/', customerController.createCustomer);

router.get('/', customerController.getAllCustomers);

router.get('/:id', customerController.getCustomerByID);

router.put('/:id', customerController.updateCustomerByID);

router.delete('/:id', customerController.deleteCustomerByID);

export const customerRoutes = router;
