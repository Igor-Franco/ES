import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException";

export default class EmailAlreadyExistsException extends HttpException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, "Email already exists");
  }
}
