import { Request, Response } from 'express';
import { customerService } from './customer.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { pick } from '../../../shared/pick';
import {
  createCustomerAllowedFields,
  updateCustomerAllowedFields,
} from './customer.constant';
import { TCustomer } from './customer.interface';

// createCustomer
const createCustomer = tryCatchAsync(async (req: Request, res: Response) => {
  const payload = pick(req.body, createCustomerAllowedFields) as TCustomer;
  const result = await customerService.createCustomerIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

// getAllCustomers
const getAllCustomers = tryCatchAsync(async (req: Request, res: Response) => {
  const result = await customerService.getAllCustomersFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customers fetched successfully',
    data: result,
  });
});

// getCustomerByID
const getCustomerByID = tryCatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await customerService.getCustomerByIDFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer fetched successfully',
    data: result,
  });
});

// updateCustomerByID
const updateCustomerByID = tryCatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = pick(req.body, updateCustomerAllowedFields) as TCustomer;
    const result = await customerService.updateCustomerByIDIntoDB(id, payload);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Customer updated successfully',
      data: result,
    });
  }
);

// deleteCustomerByID
const deleteCustomerByID = tryCatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await customerService.deleteCustomerByIDFromDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Customer deleted successfully',
    });
  }
);

export const customerController = {
  createCustomer,
  getAllCustomers,
  getCustomerByID,
  updateCustomerByID,
  deleteCustomerByID,
};
