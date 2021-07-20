import { Router } from "express";

import { CreateTaskController } from "@modules/tasks/useCases/createTask/createTaskController";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();

tasksRoutes.post("/", createTaskController.handle);

export { tasksRoutes };
