import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetTaskHistoryUseCase } from "./getTaskHistoryUseCase";

class GetTaskHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.params;
    const getTaskHistoryUseCase = container.resolve(GetTaskHistoryUseCase);
    const history = await getTaskHistoryUseCase.execute(task_id);

    return response.status(200).json(history);
  }
}

export { GetTaskHistoryController };
