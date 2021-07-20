import { inject, injectable } from "tsyringe";

import { Users } from "../infra/typeorm/entities/Users";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  email: string;
  name: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, name }: IRequest): Promise<Users> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) return userAlreadyExists;

    const user = await this.usersRepository.create({ email, name });
    return user;
  }
}

export { CreateUserUseCase };
