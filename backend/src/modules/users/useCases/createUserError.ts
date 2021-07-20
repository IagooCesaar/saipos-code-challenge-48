/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/appError";

export namespace CreateUserError {
  export class EmailIncorrect extends AppError {
    constructor(didYouMean: string) {
      super(
        "CreateUserError.EmailIncorrect",
        `O e-mail fornecido esta incorreto. Você quis dizer "${didYouMean}"`
      );
    }
  }
}
