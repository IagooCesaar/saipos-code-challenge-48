import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../infra/typeorm/entities/Users";

interface IUsersRepository {
  create({ email, name }: ICreateUserDTO): Promise<Users>;
  findByEmail(email: string): Promise<Users>;
  findByID(id: string): Promise<Users>;
}

export { IUsersRepository };
