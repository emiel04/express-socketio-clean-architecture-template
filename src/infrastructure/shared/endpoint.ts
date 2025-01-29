import express, { NextFunction, Request, Response, Express } from "express";

export interface Endpoint {
    handle(req: Request, res: Response): Promise<void>;
}
