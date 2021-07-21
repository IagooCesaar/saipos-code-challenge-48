import { Router } from "express";

import { CreateTaskController } from "@modules/tasks/useCases/createTask/createTaskController";
import { GetTasksController } from "@modules/tasks/useCases/getTasks/getTasksController";
import { MarkTaskAsUndoneController } from "@modules/tasks/useCases/markAsUndone/markAsUndoneController";
import { MarkTaskAsDoneController } from "@modules/tasks/useCases/markTaskAsDone/markTaskAsDoneController";

import { ensureHeadersWithUserId } from "../middlewares/ensureHeadersWithUserId";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const getTasksController = new GetTasksController();
const markTaskAsDoneController = new MarkTaskAsDoneController();
const markTaskAsUndoneController = new MarkTaskAsUndoneController();

tasksRoutes.post("/", createTaskController.handle);
tasksRoutes.get("/:done", getTasksController.handle);

tasksRoutes.post(
  "/:task_id/markAsDone",
  ensureHeadersWithUserId,
  markTaskAsDoneController.handle
);

tasksRoutes.post(
  "/:task_id/markAsUndone",
  ensureHeadersWithUserId,
  markTaskAsUndoneController.handle
);

export { tasksRoutes };
