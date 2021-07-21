import { getRepository, Repository } from "typeorm";

import { ICreateTaskDTO } from "@modules/tasks/dtos/ICreateTaskDTO";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";

import { Tasks } from "../entities/Tasks";

class TasksRepository implements ITasksRepository {
  private repository: Repository<Tasks>;
  constructor() {
    this.repository = getRepository(Tasks);
  }

  async findById(id: string): Promise<Tasks> {
    const task = await this.repository.findOne(id);
    return task;
  }

  async create({ description, user_id }: ICreateTaskDTO): Promise<Tasks> {
    const task = this.repository.create({
      description,
      user_id,
      done: false,
    });
    await this.repository.save(task);
    return task;
  }

  async getTasks(done: boolean): Promise<Tasks[]> {
    const tasks = await this.repository.find({
      where: { done },
      relations: ["user"],
    });
    return tasks;
  }
}

export { TasksRepository };
