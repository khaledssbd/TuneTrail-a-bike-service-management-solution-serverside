import { ServiceRecordStatus } from "@prisma/client";

export type TService = {
  bikeId: string;
  serviceDate: Date;
  description: string;
  status: ServiceRecordStatus;
};