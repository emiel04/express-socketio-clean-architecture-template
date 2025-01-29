import express, {
    NextFunction,
    type Request,
    type Response,
    Express,
} from "express";

export interface Endpoint {
    handle(req: Request, res: Response): Promise<void>;
}
