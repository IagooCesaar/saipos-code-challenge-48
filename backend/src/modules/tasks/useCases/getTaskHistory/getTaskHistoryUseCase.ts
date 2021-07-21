import { inject, injectable } from "tsyringe";

import { TaskHistory } from "@modules/tasks/infra/entities/TaskHistory";
import { ITaskHistoryRepository } from "@modules/tasks/repositories/ITaskHistoryRepository";

@injectable()
class GetTaskHistoryUseCase {
  constructor(
    @inject("TaskHistoryRepository")
    private taskHistoryRepository: ITaskHistoryRepository
  ) {}

  async execute(task_id: string): Promise<TaskHistory[]> {
    const history = await this.taskHistoryRepository.getTaskHistory(task_id);
    return history;
  }
}

export { GetTaskHistoryUseCase };
