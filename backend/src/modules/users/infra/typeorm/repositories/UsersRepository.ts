import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { Users } from "../entities/Users";

class UsersRepository implements IUsersRepository {
  private repository: Repository<Users>;
  constructor() {
    this.repository = getRepository(Users);
  }

  async create({ email, name }: ICreateUserDTO): Promise<Users> {
    const user = this.repository.create({ email, name });
    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UsersRepository };
