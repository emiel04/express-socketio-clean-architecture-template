export class ApplicationError extends Error {
    constructor(message = "An error occurred.") {
        super(message);
    }
}
