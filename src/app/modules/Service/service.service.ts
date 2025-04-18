import { ServiceRecordStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { TService } from './service.interface';

// addANewServiceIntoDB
const addANewServiceIntoDB = async (payload: TService) => {
  const result = await prisma.serviceRecord.create({
    data: payload,
  });

  return result;
};

// getAllServicesFromDB
const getAllServicesFromDB = async () => {
  const result = await prisma.serviceRecord.findMany();

  return result;
};

// getOverdueServicesFromDB
const getOverdueServicesFromDB = async () => {
  // const sevenDaysAgo = new Date();
  // sevenDaysAgo.setDate(new Date().getDate() - 7);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const result = await prisma.serviceRecord.findMany({
    where: {
      AND: [
        {
          status: {
            not: ServiceRecordStatus.done,
          },
        },
        {
          completionDate: null,
        },
        {
          serviceDate: {
            lte: sevenDaysAgo,
          },
        },
      ],
    },
  });

  return result;
};

// getServiceByIDFromDB
const getServiceByIDFromDB = async (id: string) => {
  const result = await prisma.serviceRecord.findUniqueOrThrow({
    where: { serviceId: id },
  });

  return result;
};

// markServiceCompletedByIDIntoDB
const markServiceCompletedByIDIntoDB = async (id: string) => {
  const result = await prisma.serviceRecord.update({
    where: { serviceId: id },
    data: {
      completionDate: new Date(),
      status: ServiceRecordStatus.done,
    },
  });

  return result;
};

// // deleteServiceByIDFromDB
// const deleteServiceByIDFromDB = async (id: string) => {
//   const result = await prisma.serviceRecord.delete({
//     where: { serviceId: id },
//   });

//   return result;
// };

export const serviceService = {
  addANewServiceIntoDB,
  getAllServicesFromDB,
  getOverdueServicesFromDB,
  getServiceByIDFromDB,
  markServiceCompletedByIDIntoDB,
  // deleteServiceByIDFromDB,
};
