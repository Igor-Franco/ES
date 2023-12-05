import { TypeOf, z } from "zod";

export const selectRoomSchema = z.object({
  projectId: z.string().uuid(),
});
export const messageSchema = z.object({
  userId: z.string().uuid(),
  projectId: z.string().uuid(),
    text: z.string(),
});

export type SelectRoomArgs = TypeOf<typeof selectRoomSchema>;
export type MessageArgs = TypeOf<typeof messageSchema>;
