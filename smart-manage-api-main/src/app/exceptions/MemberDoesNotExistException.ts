import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException";

export default class MemberDoesNotExistException extends HttpException {
  constructor() {
    super(StatusCodes.BAD_REQUEST, "Member does not exist");
  }
}
