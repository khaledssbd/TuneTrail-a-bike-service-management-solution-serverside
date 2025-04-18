import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import { TGlobalError } from '../interfaces/error';

interface ErrorResponse {
  success: boolean;
  status: number;
  message: string;
  stack: string | undefined;
}

// Utility function to handle Prisma known errors
const handlePrismaKnownError = (
  err: Prisma.PrismaClientKnownRequestError
): { statusCode: number; message: string } => {
  switch (err?.code) {
    case 'P2000':
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Value too long for column: ${err?.meta?.target}`,
      };
    case 'P2002':
      return {
        statusCode: StatusCodes.CONFLICT, // 409 Conflict
        message: `Unique constraint failed on: ${(
          err?.meta?.target as string[]
        ).join(', ')}`,
      };
    case 'P2003':
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Foreign key constraint failed on: ${err?.meta?.field_name}`,
      };
    case 'P2011':
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Null constraint violation on: ${err?.meta?.target}`,
      };
    case 'P2025':
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: (err?.meta?.cause as string) || 'Required record not found',
      };
    case 'P2030':
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Fulltext index not found',
      };
    default:
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err?.message || 'Database operation failed',
      };
  }
};

// globalErrorHandler function
export const globalErrorHandler = (
  err: TGlobalError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = err?.message || 'Internal Server Error';
  const stack: string | undefined = err?.stack;

  const response: ErrorResponse = {
    success: false,
    status: statusCode,
    message,
    stack: stack,
  };

  // Handle Prisma Client Known Request Errors(wrong id provided to find, update, delete, etc.)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaKnownError(err);
    statusCode = prismaError.statusCode;
    message = prismaError.message;
  }

  // Handle Prisma Validation Errors(wrong column value type is provided to create, update, etc.)
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Validation error occurred!';
  }

  // Handle Prisma Initialization Errors(Database connection issues)
  if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = StatusCodes.SERVICE_UNAVAILABLE;
    message = `Database connection failed: ${err?.message}`;
  }

  // Handle Prisma Rust Panic Errors(Critical errors in the Prisma engine)
  if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = 'Critical database engine error occurred';
  }

  // Handle Prisma Client Unknown Errors (new in recent versions)
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = `Unknown database error: ${err?.message}`;
  }

  // Handle AppError & Generic Error type error
  if (err instanceof AppError) {
    statusCode = err?.statusCode; // Assuming AppError has a statusCode property
  }

  // Update response with final message and status
  response.status = statusCode;
  response.message = message;

  res.status(statusCode).json(response);
};
