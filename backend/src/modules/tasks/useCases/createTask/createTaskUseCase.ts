import { inject, injectable } from "tsyringe";

import { Tasks } from "@modules/tasks/infra/entities/Tasks";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { CreateTaskError } from "./createTaskError";

interface IRequest {
  user_id: string;
  description: string;
}

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ description, user_id }: IRequest): Promise<Tasks> {
    if (!user_id) {
      throw new CreateTaskError.UserIdMustBeProvided();
    }

    const user = await this.usersRepository.findByID(user_id);
    if (!user) {
      throw new CreateTaskError.UserNotFound();
    }

    const task = await this.tasksRepository.create({
      description,
      user_id,
    });
    return task;
  }
}

export { CreateTaskUseCase };
