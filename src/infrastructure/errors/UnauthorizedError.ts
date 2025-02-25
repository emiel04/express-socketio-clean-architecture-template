import { HttpError } from "@infrastructure/errors/HttpError";

export class UnauthorizedError extends HttpError {
    constructor() {
        super("Unauthorized.", 403);
    }
}
