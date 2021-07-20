import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { Users } from "@modules/users/infra/typeorm/entities/Users";

import { IUsersRepository } from "../IUsersRepository";

class InMemoryUsersRepository implements IUsersRepository {
  users: Users[] = [];

  async create({ email, name }: ICreateUserDTO): Promise<Users> {
    const user = new Users();
    Object.assign(user, { email, name });
    this.users.push(user);
    return user;
  }

  async findByID(id: string): Promise<Users> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
}

export { InMemoryUsersRepository };
