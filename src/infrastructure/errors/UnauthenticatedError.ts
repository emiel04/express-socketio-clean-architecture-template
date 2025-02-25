import { HttpError } from "@infrastructure/errors/HttpError";

export class UnauthenticatedError extends HttpError {
    constructor() {
        super("Unauthenticated.", 401);
    }
}
