import { Request, Response } from 'express';
import { serviceService } from './service.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { pick } from '../../../shared/pick';
import {
  createServiceAllowedFields,
  // updateServiceAllowedFields,
} from './service.constant';
import { TService } from './service.interface';

// addANewService
const addANewService = tryCatchAsync(async (req: Request, res: Response) => {
  const payload = pick(req.body, createServiceAllowedFields) as TService;
  const result = await serviceService.addANewServiceIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Service record created successfully',
    data: result,
  });
});

// getAllServices
const getAllServices = tryCatchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getAllServicesFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service records fetched successfully',
    data: result,
  });
});


// getOverdueServices
const getOverdueServices = tryCatchAsync(
  async (req: Request, res: Response) => {
    const result = await serviceService.getOverdueServicesFromDB();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Overdue or pending services fetched successfully',
      data: result,
    });
  }
);


// getServiceByID
const getServiceByID = tryCatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await serviceService.getServiceByIDFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service record fetched successfully',
    data: result,
  });
});

// markServiceCompletedByID
const markServiceCompletedByID = tryCatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    // const payload = pick(req.body, updateServiceAllowedFields) as TService;
    const result = await serviceService.markServiceCompletedByIDIntoDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Service marked as completed',
      data: result,
    });
  }
);

// // deleteServiceByID
// const deleteServiceByID = tryCatchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   await serviceService.deleteServiceByIDFromDB(id);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Service record deleted successfully',
//   });
// });



export const serviceController = {
  addANewService,
  getAllServices,
  getOverdueServices,
  getServiceByID,
  markServiceCompletedByID,
  // deleteServiceByID,
};
