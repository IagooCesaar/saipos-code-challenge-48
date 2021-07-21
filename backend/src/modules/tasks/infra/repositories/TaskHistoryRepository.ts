import { getRepository, Repository } from "typeorm";

import { ITaskHistoryCountDTO } from "@modules/tasks/dtos/ITaskHistoryCountDTO";
import { ITaskHistoryRepository } from "@modules/tasks/repositories/ITaskHistoryRepository";

import { TaskHistory } from "../entities/TaskHistory";

class TaskHistoryRepository implements ITaskHistoryRepository {
  private repository: Repository<TaskHistory>;
  constructor() {
    this.repository = getRepository(TaskHistory);
  }

  async getTaskHistory(task_id: string): Promise<TaskHistory[]> {
    const history = await this.repository.find({
      where: { task_id },
      relations: ["user"],
    });
    return history;
  }

  async registryHistory(
    task_id: string,
    user_id: string,
    done: boolean
  ): Promise<void> {
    const history = this.repository.create({
      task_id,
      user_id,
      done,
    });
    await this.repository.save(history);
  }

  async historyCount({
    task_id,
    onlyDone,
    onlyUndone,
  }: ITaskHistoryCountDTO): Promise<number> {
    const taskQuery = await this.repository
      .createQueryBuilder("h")
      .where("h.task_id = :task_id", { task_id });

    if (onlyDone) {
      taskQuery.andWhere("h.done = true");
    }

    if (onlyUndone) {
      taskQuery.andWhere("h.done = false");
    }

    const count = await taskQuery.getCount();
    return count;
  }
}

export { TaskHistoryRepository };
