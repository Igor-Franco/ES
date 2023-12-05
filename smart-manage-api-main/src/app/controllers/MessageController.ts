import { MessageArgs } from "../schemas/chatSchema";
import { GetAllMessagesRequest } from "../schemas/messageSchema";
import { CreateMessageService } from "../services/CreateMessageService";
import { GetAllMessagesService } from "../services/GetAllMessagesService";

export class MessageController {
  async create({ userId, projectId, text }: MessageArgs) {
    const service = new CreateMessageService();
    const message = await service.execute({ userId, projectId, text });

    return message;
  }

  async list({ projectId }: GetAllMessagesRequest) {
    const service = new GetAllMessagesService();
    const messages = await service.execute({ projectId });

    return messages;
  }
}
