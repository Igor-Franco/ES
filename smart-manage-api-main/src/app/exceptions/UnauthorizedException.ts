import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException";

export default class UnauthorizedException extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }
}
