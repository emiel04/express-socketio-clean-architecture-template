import type { Request, Response } from "express";

export interface Endpoint {
    handle(req: Request, res: Response): Promise<void>;
}
