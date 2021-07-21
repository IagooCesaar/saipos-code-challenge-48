import { container } from "tsyringe";
import "./providers";

import { TaskHistoryRepository } from "@modules/tasks/infra/repositories/TaskHistoryRepository";
import { TasksRepository } from "@modules/tasks/infra/repositories/TasksRepository";
import { ITaskHistoryRepository } from "@modules/tasks/repositories/ITaskHistoryRepository";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  TasksRepository
);

container.registerSingleton<ITaskHistoryRepository>(
  "TaskHistoryRepository",
  TaskHistoryRepository
);
