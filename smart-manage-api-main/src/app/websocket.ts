/* eslint-disable @typescript-eslint/no-floating-promises */
import { io } from ".";
import { MessageController } from "./controllers/MessageController";
import { SelectRoomArgs } from "./schemas/chatSchema";
import { MessageArgs } from "./schemas/chatSchema";

io.on("connection", (socket) => {
  socket.on("selectRoom", async ({ projectId }: SelectRoomArgs, callback) => {
    const rooms = io.sockets.adapter.sids.get(socket.id);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    rooms?.forEach(async (room) => await socket.leave(room));

    socket.join(projectId);

    const messages = await new MessageController().list({ projectId });

    callback(messages);
  });

  socket.on("message", async ({ userId, projectId, text }: MessageArgs) => {
    const message = await new MessageController().create({
      userId,
      projectId,
      text,
    });

    io.to(projectId).emit("message", message);
  });
});
