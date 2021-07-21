/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/appError";

export namespace MarkTaskAsUndoneError {
  export class PasswordNotMatched extends AppError {
    constructor() {
      super(
        "MarkTaskAsUndoneError.PasswordNotMatched",
        "A senha fornecida para tornar a tarefa pendente não confere. Tente novamente"
      );
    }
  }

  export class TaskNotFound extends AppError {
    constructor() {
      super(
        "MarkTaskAsUndoneError.TaskNotFound",
        "Não foi possível encontrar uma tarefa com o ID fornecido"
      );
    }
  }

  export class TaskAlreadyMarkedAsUndone extends AppError {
    constructor() {
      super(
        "MarkTaskAsUndoneError.TaskAlreadyMarkedAsUndone",
        "A tarefa já se encontra com status de concluída"
      );
    }
  }

  export class TaskUndoneLimiteReached extends AppError {
    constructor() {
      super(
        "MarkTaskAsUndoneError.TaskUndoneLimiteReached",
        "A tarefa já atingiu o limite máximo de atualização para status de pendência"
      );
    }
  }

  export class UserNotFound extends AppError {
    constructor() {
      super(
        "MarkTaskAsUndoneError.UserNotFound",
        "Não foi possível encontrar um usuário com o ID fornecido"
      );
    }
  }
}
