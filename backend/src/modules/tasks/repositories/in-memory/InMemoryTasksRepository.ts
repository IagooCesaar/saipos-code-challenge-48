import { ICreateTaskDTO } from "@modules/tasks/dtos/ICreateTaskDTO";
import { Tasks } from "@modules/tasks/infra/entities/Tasks";

import { ITasksRepository } from "../ITasksRepository";

class InMemoryTasksRepository implements ITasksRepository {
  tasks: Tasks[] = [];

  async create({ description, user_id }: ICreateTaskDTO): Promise<Tasks> {
    const task = new Tasks();
    Object.assign(task, { description, user_id });
    this.tasks.push(task);
    return task;
  }

  async findById(id: string): Promise<Tasks> {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  async getTasks(done: boolean): Promise<Tasks[]> {
    const filteredTasks = this.tasks.filter((task) => task.done === done);
    return filteredTasks;
  }
}

export { InMemoryTasksRepository };
