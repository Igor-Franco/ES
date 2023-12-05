import { TypeOf, z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required.",
        invalid_type_error: "Name must be a string",
      })
      .min(1, { message: "Name must not be empty." }),
    description: z
      .string({
        required_error: "Description is required.",
        invalid_type_error: "Description must be a string",
      })
      .min(1, { message: "Description must not be empty." }),
    membersId: z.string().uuid().array(),
  }),
});

export type CreateProjectRequest = TypeOf<typeof createProjectSchema>["body"];
export type GetAllProjectsRequest = {
  userId: string;
};
