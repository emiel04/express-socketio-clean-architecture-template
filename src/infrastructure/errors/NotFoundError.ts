import { HttpError } from "@infrastructure/errors/HttpError";

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(message, 404);
    }
}
