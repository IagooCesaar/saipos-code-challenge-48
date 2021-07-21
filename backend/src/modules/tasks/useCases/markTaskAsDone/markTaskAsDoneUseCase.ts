import { inject, injectable } from "tsyringe";

import { Tasks } from "@modules/tasks/infra/entities/Tasks";
import { ITaskHistoryRepository } from "@modules/tasks/repositories/ITaskHistoryRepository";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { MarkTaskAsDoneError } from "./markTaskAsDoneError";

interface IRequest {
  user_id: string;
  task_id: string;
}

@injectable()
class MarkTaskAsDoneUseCase {
  constructor(
    @inject("TaskHistoryRepository")
    private taskHistoryRepository: ITaskHistoryRepository,

    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ task_id, user_id }: IRequest): Promise<Tasks> {
    console.log({ task_id, user_id });
    const task = await this.tasksRepository.findById(task_id);
    console.log(task);

    if (!task) {
      throw new MarkTaskAsDoneError.TaskNotFound();
    }
    if (task.done) {
      throw new MarkTaskAsDoneError.TaskAlreadyMarkedAsDone();
    }

    const user = await this.usersRepository.findByID(user_id);
    if (!user) {
      throw new MarkTaskAsDoneError.UserNotFound();
    }

    console.log({ task_id, user_id });
    await this.taskHistoryRepository.registryHistory(task_id, user_id, true);
    task.done = true;

    await this.tasksRepository.create(task);

    return task;
  }
}

export { MarkTaskAsDoneUseCase };
