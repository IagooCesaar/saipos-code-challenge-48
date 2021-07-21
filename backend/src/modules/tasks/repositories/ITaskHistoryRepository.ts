import { ITaskHistoryCountDTO } from "../dtos/ITaskHistoryCountDTO";
import { TaskHistory } from "../infra/entities/TaskHistory";

interface ITaskHistoryRepository {
  registryHistory(
    task_id: string,
    user_id: string,
    done: boolean
  ): Promise<void>;
  historyCount(data: ITaskHistoryCountDTO): Promise<number>;
  getTaskHistory(task_id: string): Promise<TaskHistory[]>;
}

export { ITaskHistoryRepository };
