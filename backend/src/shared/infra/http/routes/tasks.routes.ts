import { Router } from "express";

import { CreateTaskController } from "@modules/tasks/useCases/createTask/createTaskController";
import { GetTasksController } from "@modules/tasks/useCases/getTasks/getTasksController";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const getTasksController = new GetTasksController();

tasksRoutes.post("/", createTaskController.handle);
tasksRoutes.get("/:done", getTasksController.handle);

export { tasksRoutes };
