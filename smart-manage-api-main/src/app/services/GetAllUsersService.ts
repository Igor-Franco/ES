import { AppDataSource } from "../../database";
import User from "../models/User";
import { ILike } from "typeorm";
import { GetAllUsersRequest } from "../schemas/userSchema";

export class GetAllUsersService {
  async execute({ search = "", page = 1, limit = 10 }: GetAllUsersRequest) {
    const skip = (page - 1) * limit;
    const repository = AppDataSource.getRepository(User);

    const [users, count] = await repository.findAndCount({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      order: { name: "ASC" },
      where: [{ name: ILike(`%${search}%`) }, { email: ILike(`%${search}%`) }],
      take: limit,
      skip,
    });

    return [users, count];
  }
}
