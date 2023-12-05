import { AppDataSource } from "../../database";
import UserDoesNotExistException from "../exceptions/UserDoesNotExistException";
import User from "../models/User";
import { GetAllProjectsRequest } from "../schemas/projectSchema";

export class GetAllProjectsService {
  async execute({ userId }: GetAllProjectsRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      relations: ["projects"],
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UserDoesNotExistException();
    }

    return user.projects;
  }
}
