import { AppDataSource } from "../../database";
import Message from "../models/Message";
import { GetAllMessagesRequest } from "../schemas/messageSchema";

export class GetAllMessagesService {
  async execute({ projectId }: GetAllMessagesRequest) {
    const repository = AppDataSource.getRepository(Message);

    const messages = await repository.find({
      where: {
        roomId: projectId,
      },
      relations: ["user"],
      select: {
        id: true,
        text: true,
        user: {
          name: true,
          email: true,
          role: true,
        },
        createdAt: true,
      },
    });

    return messages;
  }
}
