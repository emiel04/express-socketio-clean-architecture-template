import { HealthEndpoint } from "@infrastructure/endpoints/HealthEndpoint";
import type { Express, Request, Response } from "express";
import { Server as SocketIOServer, type Socket } from "socket.io";
import { ConnectionEndpoint } from "@infrastructure/endpoints/ws/ConnectionEndpoint";
import handleSocketEvent from "@infrastructure/setup/websocket/SocketHandler";

export function registerRoutes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        res.json({ hello: "world" });
    });

    app.get("/health", async (req: Request, res: Response) => {
        const endpoint = new HealthEndpoint();
        await endpoint.handle(req, res);
    });
}

export function registerWSEvents(io: SocketIOServer) {
    io.on(
        "connection",
        handleSocketEvent(async (socket: Socket) => {
            const connectionEndpoint = new ConnectionEndpoint();
            await connectionEndpoint.handle(socket);
        })
    );
}
