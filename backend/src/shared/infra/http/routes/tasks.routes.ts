import { Router } from "express";

import { CreateTaskController } from "@modules/tasks/useCases/createTask/createTaskController";
import { GetTaskHistoryController } from "@modules/tasks/useCases/getTaskHistory/getTaskHistoryController";
import { GetTasksController } from "@modules/tasks/useCases/getTasks/getTasksController";
import { MarkTaskAsUndoneController } from "@modules/tasks/useCases/markAsUndone/markAsUndoneController";
import { MarkTaskAsDoneController } from "@modules/tasks/useCases/markTaskAsDone/markTaskAsDoneController";

import { ensureHeadersWithUserId } from "../middlewares/ensureHeadersWithUserId";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const getTasksController = new GetTasksController();
const markTaskAsDoneController = new MarkTaskAsDoneController();
const markTaskAsUndoneController = new MarkTaskAsUndoneController();
const getTaskHistory = new GetTaskHistoryController();

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

tasksRoutes.get("/:task_id/history", getTaskHistory.handle);

export { tasksRoutes };
