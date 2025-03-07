import { HealthEndpoint } from "@infrastructure/endpoints/HealthEndpoint";
import type { Express, Request, Response } from "express";

export function registerRoutes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        res.json({ hello: "world" });
    });

    app.get("/health", async (req: Request, res: Response) => {
        const endpoint = new HealthEndpoint();
        await endpoint.handle(req, res);
    });
}
