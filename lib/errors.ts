export class NotFoundError extends Error {
  name = "NotFoundError";
  constructor(message: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}
