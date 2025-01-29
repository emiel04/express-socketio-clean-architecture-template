import { ApplicationError } from "./ApplicationError";

export class DomainError extends ApplicationError {
    constructor(message: string) {
        super(message);
    }
}
