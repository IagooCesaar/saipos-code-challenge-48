import { inject, injectable } from "tsyringe";

import { mailboxLayer } from "@shared/infra/services/mailboxLayer";

import { Users } from "../infra/typeorm/entities/Users";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { CreateUserError } from "./createUserError";

interface IRequest {
  email: string;
  name: string;
}

interface IResponse {
  user: Users;
  created: boolean;
}

interface IMailboxLayerResponse {
  catch_all: boolean;
  did_you_mean?: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, name }: IRequest): Promise<IResponse> {
    const response = await mailboxLayer.get("", {
      params: {
        email,
      },
    });

    const mailboxLayerResponse = response.data as IMailboxLayerResponse;
    if (!mailboxLayerResponse.catch_all) {
      throw new CreateUserError.EmailIncorrect(
        mailboxLayerResponse.did_you_mean
      );
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists)
      return {
        user: userAlreadyExists,
        created: false,
      };

    const user = await this.usersRepository.create({ email, name });
    return { user, created: true };
  }
}

export { CreateUserUseCase };
