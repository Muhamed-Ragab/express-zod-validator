import type { ErrorRequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

type ResponseError = {
  statusCode: number;
  message: string;
  errorCode: string;
};

const handleErrors = (error: unknown): ResponseError => {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((err) => `${err.path} ${err.message}`);

    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: errors[0],
      errorCode: ReasonPhrases.BAD_REQUEST,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something went wrong",
    errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR,
  };
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (res.headersSent) {
    return;
  }

  const responseError = handleErrors(error);

  console.error(
    `[${new Date().toISOString()}] ${responseError.errorCode} - ${
      responseError.message
    }`
  );

  res.status(responseError.statusCode).json(responseError);
};
