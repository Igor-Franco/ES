import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException";

export default class UserDoesNotExistException extends HttpException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, "User does not exist");
  }
}
