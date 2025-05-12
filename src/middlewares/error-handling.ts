import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  //tratamento de exceção do AppError
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  //tratamento de validação do zod
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation error",
      issues: error.format(),
    });
  }

  //retorno mais genérico, se não for nenhum dos outros erros
  return response.status(500).json({
    message: `Internal server error - ${error.message}`,
  });
}
