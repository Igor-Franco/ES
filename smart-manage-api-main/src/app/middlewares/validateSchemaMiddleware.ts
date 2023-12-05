import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import ValidationException from "../exceptions/ValidationException";

export const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      next(new ValidationException(e as ZodError));
    }
  };
