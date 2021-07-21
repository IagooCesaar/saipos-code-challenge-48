import { ITaskHistoryCountDTO } from "../dtos/ITaskHistoryCountDTO";

interface ITaskHistoryRepository {
  registryHistory(
    task_id: string,
    user_id: string,
    done: boolean
  ): Promise<void>;
  historyCount(data: ITaskHistoryCountDTO): Promise<number>;
}

export { ITaskHistoryRepository };
