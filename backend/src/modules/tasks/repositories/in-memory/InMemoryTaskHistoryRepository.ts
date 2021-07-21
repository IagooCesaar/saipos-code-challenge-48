import { ITaskHistoryCountDTO } from "@modules/tasks/dtos/ITaskHistoryCountDTO";
import { TaskHistory } from "@modules/tasks/infra/entities/TaskHistory";

import { ITaskHistoryRepository } from "../ITaskHistoryRepository";

class InMemoryTaskHistoryRepository implements ITaskHistoryRepository {
  taskHistory: TaskHistory[] = [];

  async registryHistory(
    task_id: string,
    user_id: string,
    done: boolean
  ): Promise<void> {
    const history = new TaskHistory();
    Object.assign(history, { task_id, user_id, done });
    this.taskHistory.push(history);
  }

  async historyCount({
    task_id,
    onlyDone,
    onlyUndone,
  }: ITaskHistoryCountDTO): Promise<number> {
    const history = this.taskHistory.filter(
      (item) =>
        item.task_id === task_id &&
        (onlyDone ? item.done === true : true) &&
        (onlyUndone ? item.done === false : true)
    );
    return history.length;
  }
}

export { InMemoryTaskHistoryRepository };
