import { TypeOf, z } from "zod";
import { UserRoles } from "../models/User";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required.",
        invalid_type_error: "Name must be a string",
      })
      .min(1, { message: "Name must not be empty." }),
    email: z
      .string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a string",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required.",
        invalid_type_error: "Password must be a string",
      })
      .min(1, { message: "Password must not be empty." }),
    role: z.enum(UserRoles).default("fullstack"),
  }),
});

export const listUserSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().positive().optional(),
  }),
});

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateUserRequest = TypeOf<typeof createUserSchema>["body"];
export type GetAllUsersRequest = TypeOf<typeof listUserSchema>["query"];
export type GetUserByIdRequest = TypeOf<typeof getUserByIdSchema>["params"];
