import { inject, injectable } from "tsyringe";

import { Tasks } from "@modules/tasks/infra/entities/Tasks";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";

@injectable()
class GetTasksUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute(done: boolean): Promise<Tasks[]> {
    const tasks = await this.tasksRepository.getTasks(done);
    return tasks;
  }
}

export { GetTasksUseCase };
