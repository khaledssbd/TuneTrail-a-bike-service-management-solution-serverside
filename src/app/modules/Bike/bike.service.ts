import prisma from '../../../shared/prisma';
import { TBike } from './bike.interface';

// addANewBikeIntoDB
const addANewBikeIntoDB = async (payload: TBike) => {
  const result = await prisma.bike.create({
    data: payload,
  });

  return result;
};

// getAllBikesFromDB
const getAllBikesFromDB = async () => {
  const result = await prisma.bike.findMany();

  return result;
};

// getBikeByIDFromDB
const getBikeByIDFromDB = async (id: string) => {
  const result = await prisma.bike.findUniqueOrThrow({
    where: { bikeId: id },
  });

  return result;
};

// // updateBikeByIDIntoDB
// const updateBikeByIDIntoDB = async (id: string, payload: TBike) => {
//   const result = await prisma.bike.update({
//     where: { bikeId: id },
//     data: payload,
//   });

//   return result;
// };

// // deleteBikeByIDFromDB
// const deleteBikeByIDFromDB = async (id: string) => {
//   const result = await prisma.bike.delete({
//     where: { bikeId: id },
//   });

//   return result;
// };

export const bikeService = {
  addANewBikeIntoDB,
  getAllBikesFromDB,
  getBikeByIDFromDB,
  // updateBikeByIDIntoDB,
  // deleteBikeByIDFromDB,
};
