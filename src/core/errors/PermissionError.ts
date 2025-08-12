import { HttpError } from "./HttpError";

export class PermissionError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}
