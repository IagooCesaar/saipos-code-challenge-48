/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/appError";

export namespace MarkTaskAsDoneError {
  export class TaskNotFound extends AppError {
    constructor() {
      super(
        "MarkTaskAsDoneError.TaskNotFound",
        "Não foi possível encontrar uma tarefa com o ID fornecido"
      );
    }
  }
  export class TaskAlreadyMarkedAsDone extends AppError {
    constructor() {
      super(
        "MarkTaskAsDoneError.TaskAlreadyMarkedAsDone",
        "A tarefa já se encontra com status de concluída"
      );
    }
  }

  export class UserNotFound extends AppError {
    constructor() {
      super(
        "MarkTaskAsDoneError.UserNotFound",
        "Não foi possível encontrar um usuário com o ID fornecido"
      );
    }
  }
}
