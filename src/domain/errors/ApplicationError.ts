export class ApplicationError extends Error {
    constructor(message: string = "An error occurred.") {
        super(message);
    }
}