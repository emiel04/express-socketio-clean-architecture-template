export interface Controller<Request> {
    handle(request: Request): Promise<void>;
}
