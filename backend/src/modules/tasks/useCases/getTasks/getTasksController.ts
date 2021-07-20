import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetTasksUseCase } from "./getTasksUseCase";

class GetTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const done = request.params.done === "done";
    const getTasksUseCase = container.resolve(GetTasksUseCase);
    const tasks = await getTasksUseCase.execute(done);

    return response.status(200).json(tasks);
  }
}

export { GetTasksController };
