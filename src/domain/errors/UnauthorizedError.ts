import { ApplicationError } from "./ApplicationError";

export class UnauthorizedError extends ApplicationError {
    constructor() {
        super("Unauthorized.");
    }
}
