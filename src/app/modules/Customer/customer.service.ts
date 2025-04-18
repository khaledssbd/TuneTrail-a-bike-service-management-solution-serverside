import prisma from '../../../shared/prisma';
import { TCustomer } from './customer.interface';

// createCustomerIntoDB
const createCustomerIntoDB = async (payload: TCustomer) => {
  const result = await prisma.customer.create({
    data: payload,
  });

  return result;
};

// getAllCustomersFromDB
const getAllCustomersFromDB = async () => {
  const result = await prisma.customer.findMany();

  return result;
};

// getCustomerByIDFromDB
const getCustomerByIDFromDB = async (id: string) => {
  const result = await prisma.customer.findUniqueOrThrow({
    where: { customerId: id },
  });

  return result;
};

// updateCustomerByIDIntoDB
const updateCustomerByIDIntoDB = async (id: string, payload: TCustomer) => {
  const result = await prisma.customer.update({
    where: { customerId: id },
    data: payload,
  });

  return result;
};

// deleteCustomerByIDFromDB
const deleteCustomerByIDFromDB = async (id: string) => {
  const result = await prisma.customer.delete({
    where: { customerId: id },
  });

  return result;
};

export const customerService = {
  createCustomerIntoDB,
  getAllCustomersFromDB,
  getCustomerByIDFromDB,
  updateCustomerByIDIntoDB,
  deleteCustomerByIDFromDB,
};
