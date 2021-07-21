/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/appError";

export namespace EnsureHeadersWithUserIdError {
  export class UserIdNotProvided extends AppError {
    constructor() {
      super(
        "EnsureHeadersWithUserIdError.UserIdNotProvided",
        "User ID not provided on Headers"
      );
    }
  }
}
