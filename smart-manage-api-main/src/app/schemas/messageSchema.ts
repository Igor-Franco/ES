import { TypeOf, z } from "zod";

export const messageSchema = z.object({
  userId: z.string().uuid(),
  projectId: z.string().uuid(),
  text: z.string(),
});

export const listMessagesSchema = z.object({
  projectId: z.string().uuid(),
});

export type MessageArgs = TypeOf<typeof messageSchema>;
export type GetAllMessagesRequest = TypeOf<typeof listMessagesSchema>;
