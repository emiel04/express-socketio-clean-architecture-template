import {
    type Request,
    type Response,

} from "express";

export interface Endpoint {
    handle(req: Request, res: Response): Promise<void>;
}
