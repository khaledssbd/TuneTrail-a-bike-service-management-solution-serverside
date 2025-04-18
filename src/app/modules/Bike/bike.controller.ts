import { Request, Response } from 'express';
import { bikeService } from './bike.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { pick } from '../../../shared/pick';
import {
  createBikeAllowedFields,
  // updateBikeAllowedFields,
} from './bike.constant';
import { TBike } from './bike.interface';

// addANewBike
const addANewBike = tryCatchAsync(async (req: Request, res: Response) => {
  const payload = pick(req.body, createBikeAllowedFields) as TBike;
  const result = await bikeService.addANewBikeIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

// getAllBikes
const getAllBikes = tryCatchAsync(async (req: Request, res: Response) => {
  const result = await bikeService.getAllBikesFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bikes fetched successfully',
    data: result,
  });
});

// getBikeByID
const getBikeByID = tryCatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bikeService.getBikeByIDFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bike fetched successfully',
    data: result,
  });
});

// // updateBikeByID
// const updateBikeByID = tryCatchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const payload = pick(req.body, updateBikeAllowedFields) as TBike;
//   const result = await bikeService.updateBikeByIDIntoDB(id, payload);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Bike updated successfully',
//     data: result,
//   });
// });

// // deleteBikeByID
// const deleteBikeByID = tryCatchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   await bikeService.deleteBikeByIDFromDB(id);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Bike deleted successfully',
//   });
// });

export const bikeController = {
  addANewBike,
  getAllBikes,
  getBikeByID,
  // updateBikeByID,
  // deleteBikeByID,
};
