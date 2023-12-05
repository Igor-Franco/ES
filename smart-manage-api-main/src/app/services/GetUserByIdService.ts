import { AppDataSource } from "../../database";
import UserDoesNotExistException from "../exceptions/UserDoesNotExistException";
import User from "../models/User";
import { GetUserByIdRequest } from "../schemas/userSchema";

export class GetUserByIdService {
  async execute({ id }: GetUserByIdRequest) {
    const repository = AppDataSource.getRepository(User);

    const user = await repository.findOne({
      relations: ["projects"],
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        projects: true,
      },
    });

    if (!user) {
      throw new UserDoesNotExistException();
    }

    return user;
  }
}
