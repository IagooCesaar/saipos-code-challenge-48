import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { user, created } = await createUserUseCase.execute({ name, email });

    return response.status(created ? 201 : 200).json(user);
  }
}

export { CreateUserController };
