import { Request, Response } from "express";
import { container } from "tsyringe";

import { MarkTaskAsUndoneUseCase } from "./markAsUndoneUseCase";

class MarkTaskAsUndoneController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.params;
    const { user_id } = request.headers;
    const { password } = request.body;

    const markTaskAsUndoneUseCase = container.resolve(MarkTaskAsUndoneUseCase);
    const task = await markTaskAsUndoneUseCase.execute({
      task_id,
      user_id: String(user_id),
      password,
    });

    return response.status(200).json(task);
  }
}

export { MarkTaskAsUndoneController };
