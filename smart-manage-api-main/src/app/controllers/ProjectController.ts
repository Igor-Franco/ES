import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateProjectService } from "../services/CreateProjectService";
import { CreateProjectRequest } from "../schemas/projectSchema";
import { GetAllProjectsService } from "../services/GetProjectsByUserIdService";

export class ProjectController {
  async create(
    req: Request<object, object, CreateProjectRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, description, membersId } = req.body;
      const service = new CreateProjectService();
      const project = await service.execute({
        name,
        description,
        membersId,
      });

      return res.status(StatusCodes.CREATED).json({
        id: project.id,
        message: "Project created successfully",
      });
    } catch (e) {
      return next(e);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;
    const service = new GetAllProjectsService();
    const projects = await service.execute({ userId });
    return res.json(projects);
  }
}
