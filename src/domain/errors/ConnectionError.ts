import {ApplicationError} from "./ApplicationError";

export class ConnectionError extends ApplicationError {
    constructor() {
        super("A connection error occurred.");
    }
}

