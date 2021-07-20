/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/appError";

export namespace CreateTaskError {
  export class UserIdMustBeProvided extends AppError {
    constructor() {
      super(
        "CreateTaskError.UserIdMustBeProvided",
        "Deverá ser fornecido a identificação do usuário responsável (user_id)"
      );
    }
  }

  export class UserNotFound extends AppError {
    constructor() {
      super(
        "CreateTaskError.UserNotFound",
        "Não foi possível encontrar um usuário com o ID fornecido"
      );
    }
  }
}
