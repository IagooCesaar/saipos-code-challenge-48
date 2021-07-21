import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { Tasks } from "../infra/entities/Tasks";

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Tasks>;
  getTasks(done: boolean): Promise<Tasks[]>;
  findById(id: string): Promise<Tasks>;
}

export { ITasksRepository };
