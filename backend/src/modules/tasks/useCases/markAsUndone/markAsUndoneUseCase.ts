import { inject, injectable } from "tsyringe";

import { Tasks } from "@modules/tasks/infra/entities/Tasks";
import { ITaskHistoryRepository } from "@modules/tasks/repositories/ITaskHistoryRepository";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { MarkTaskAsUndoneError } from "./markAsUndoneError";

interface IRequest {
  user_id: string;
  task_id: string;
  password: string;
}

@injectable()
class MarkTaskAsUndoneUseCase {
  constructor(
    @inject("TaskHistoryRepository")
    private taskHistoryRepository: ITaskHistoryRepository,

    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ task_id, user_id, password }: IRequest): Promise<Tasks> {
    if (password !== process.env.UNDONE_TASK_PASSWORD) {
      throw new MarkTaskAsUndoneError.PasswordNotMatched();
    }

    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new MarkTaskAsUndoneError.TaskNotFound();
    }
    if (!task.done) {
      throw new MarkTaskAsUndoneError.TaskAlreadyMarkedAsUndone();
    }

    const user = await this.usersRepository.findByID(user_id);
    if (!user) {
      throw new MarkTaskAsUndoneError.UserNotFound();
    }

    const undoneCount = await this.taskHistoryRepository.historyCount({
      task_id,
      onlyUndone: true,
    });

    if (undoneCount >= Number(process.env.UNDONE_TASK_LIMITER_COUNT)) {
      throw new MarkTaskAsUndoneError.TaskUndoneLimiteReached();
    }

    await this.taskHistoryRepository.registryHistory(task_id, user_id, false);
    task.done = false;

    await this.tasksRepository.create(task);

    return task;
  }
}

export { MarkTaskAsUndoneUseCase };
