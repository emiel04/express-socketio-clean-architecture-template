import { ApplicationError } from "@domain/errors/ApplicationError";

export class HttpError extends ApplicationError {
    constructor(
        message: string,
        private _statusCode: number
    ) {
        super(message);
    }

    get statusCode(): number {
        return this._statusCode;
    }
}
