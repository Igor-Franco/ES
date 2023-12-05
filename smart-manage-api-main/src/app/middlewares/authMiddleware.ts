import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../database";
import User from "../models/User";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const userRepository = AppDataSource.getRepository(User);

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Missing authorization token" });
  }

  const [, token] = authorization.split(" ");

  try {
    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TokenPayload;
    const user = await userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new Error();
    }

    req.userId = id;

    return next();
  } catch {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired token" });
  }
};
