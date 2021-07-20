import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTaskUseCase } from "./createTaskUseCase";

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const user_id = request.body.user_id || request.headers.user_id;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);
    const task = await createTaskUseCase.execute({ description, user_id });

    return response.status(201).json(task);
  }
}

export { CreateTaskController };
