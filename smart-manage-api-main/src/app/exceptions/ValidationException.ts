import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException";
import { ZodError } from "zod";

export default class ValidationException extends HttpException {
  constructor(e: ZodError) {
    const errors: string[] = [];
    e.errors.forEach((error) => errors.push(error.message));
    super(StatusCodes.BAD_REQUEST, errors);
  }
}
