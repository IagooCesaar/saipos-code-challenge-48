import { NextFunction, Request, Response } from "express";

import { EnsureHeadersWithUserIdError } from "@shared/errors/ensureHeadersWithUserIdError";

export async function ensureHeadersWithUserId(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { user_id } = request.headers;
  if (!user_id) {
    throw new EnsureHeadersWithUserIdError.UserIdNotProvided();
  }
  next();
}
