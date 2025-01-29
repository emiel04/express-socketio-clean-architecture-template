import { HealthEndpoint } from "./endpoints/HealthEndpoint";
import type { Express } from "express";

export function registerRoutes(app: Express, io: any) {
    app.get("/", (req, res) => {
        res.json({ hello: "world" });
    });

    app.get("/health", async (req: any, res: any) => {
        const endpoint = new HealthEndpoint();
        await endpoint.handle(req, res);
    });
}
