import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { GetAllUsersService } from "../services/GetAllUsersService";
import { CreateUserService } from "../services/CreateUserService";
import {
  CreateUserRequest,
  GetAllUsersRequest,
  GetUserByIdRequest,
} from "../schemas/userSchema";
import { GetUserByIdService } from "../services/GetUserByIdService";

export class UserController {
  async create(
    req: Request<object, object, CreateUserRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, email, password, role } = req.body;

      const service = new CreateUserService();
      const user = await service.execute({ name, email, password, role });

      return res.status(StatusCodes.CREATED).json({
        id: user.id,
        message: "User created successfully",
      });
    } catch (e) {
      return next(e);
    }
  }

  async list(
    req: Request<object, object, object, GetAllUsersRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { search, page, limit } = req.query;

      const service = new GetAllUsersService();
      const [users, count] = await service.execute({ search, page, limit });

      return res.status(StatusCodes.OK).json({ count, users });
    } catch (e) {
      return next(e);
    }
  }

  async findById(
    req: Request<GetUserByIdRequest, object, object>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const service = new GetUserByIdService();
      const user = await service.execute({ id });

      return res.status(StatusCodes.OK).json(user);
    } catch (e) {
      return next(e);
    }
  }
}
