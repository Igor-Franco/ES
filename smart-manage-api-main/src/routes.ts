import { Router } from "express";
import { AuthController } from "./app/controllers/AuthController";
import { UserController } from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddleware";
import errorMiddleware from "./app/middlewares/errorMiddleware";
import { ProjectController } from "./app/controllers/ProjectController";
import { validateSchema } from "./app/middlewares/validateSchemaMiddleware";
import {
  createUserSchema,
  getUserByIdSchema,
  listUserSchema,
} from "./app/schemas/userSchema";
import { createProjectSchema } from "./app/schemas/projectSchema";

const routes = Router();

routes.post("/authenticate", new AuthController().authenticate);
routes.post(
  "/users",
  validateSchema(createUserSchema),
  new UserController().create,
);

routes.use(authMiddleware);

routes.get("/users", validateSchema(listUserSchema), new UserController().list);
routes.get(
  "/users/:id",
  validateSchema(getUserByIdSchema),
  new UserController().findById,
);
routes.post(
  "/projects",
  validateSchema(createProjectSchema),
  new ProjectController().create,
);
routes.get("/projects", new ProjectController().list);

routes.use(errorMiddleware);

export default routes;
