import {ApplicationError} from "./ApplicationError";

export class UnauthenticatedError extends ApplicationError {
    constructor() {
        super("Unauthenticated.");
    }
}