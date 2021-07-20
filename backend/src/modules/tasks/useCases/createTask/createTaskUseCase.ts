import { inject, injectable } from "tsyringe";

import { Tasks } from "@modules/tasks/infra/entities/Tasks";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { CreateTaskError } from "./createTaskError";

interface IRequest {
  user_id?: string;
  email?: string;
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

  async execute({ description, user_id, email }: IRequest): Promise<Tasks> {
    if (!user_id && !email) {
      throw new CreateTaskError.UserIdMustBeProvided();
    }

    let validUserId = "";
    if (user_id) {
      const user = await this.usersRepository.findByID(user_id);
      if (!user) {
        throw new CreateTaskError.UserNotFound();
      }
      validUserId = user.id;
    } else if (email) {
      const user = await this.usersRepository.findByEmail(email);
      if (!user) {
        throw new CreateTaskError.UserNotFound();
      }
      validUserId = user.id;
    }

    const task = await this.tasksRepository.create({
      description,
      user_id: validUserId,
    });
    return task;
  }
}

export { CreateTaskUseCase };
