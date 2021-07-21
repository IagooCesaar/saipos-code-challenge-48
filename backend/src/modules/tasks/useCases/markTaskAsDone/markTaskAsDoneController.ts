import { Request, Response } from "express";
import { container } from "tsyringe";

import { MarkTaskAsDoneUseCase } from "./markTaskAsDoneUseCase";

class MarkTaskAsDoneController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.params;
    const { user_id } = request.headers;

    const markTaskAsDoneUseCase = container.resolve(MarkTaskAsDoneUseCase);
    const task = await markTaskAsDoneUseCase.execute({
      task_id,
      user_id: String(user_id),
    });

    return response.status(200).json(task);
  }
}

export { MarkTaskAsDoneController };
