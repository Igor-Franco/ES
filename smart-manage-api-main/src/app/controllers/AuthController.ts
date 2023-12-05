import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

import User from "../models/User";
import { AppDataSource } from "../../database";
import ValidationException from "../exceptions/ValidationException";
import UnauthorizedException from "../exceptions/UnauthorizedException";

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthController {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = AppDataSource.getRepository(User);
      const { email, password } = authenticateSchema.parse(req.body);

      const user = await repository.findOne({ where: { email } });

      if (!user) {
        return next(new UnauthorizedException());
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return next(new UnauthorizedException());
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET ?? "developSecret",
      );

      return res.status(StatusCodes.OK).json({ id: user.id, token });
    } catch (e) {
      if (e instanceof ZodError) {
        return next(new ValidationException(e));
      }
      return next(e);
    }
  }
}
