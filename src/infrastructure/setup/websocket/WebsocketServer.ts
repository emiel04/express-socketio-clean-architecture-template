import type { Server as HttpServer } from "node:http";
import { Server as SocketIOServer, type ServerOptions } from "socket.io";
import logger from "@infrastructure/helper/Logger";
import config from "@helper/config";
import { socketLoggingMiddleware } from "@infrastructure/setup/Middleware";
import { registerWSEvents } from "@infrastructure/setup/Routes";

export class WebSocketServer {
    private readonly io: SocketIOServer;

    constructor(httpServer: HttpServer) {
        logger.info("Creating websocket server");
        const options: Partial<ServerOptions> = {
            cors: {
                origin: "*", // TODO make safe
                methods: ["GET", "POST"],
            },
        };

        if (config.enableConnectionStateRecovery) {
            options.connectionStateRecovery = {
                maxDisconnectionDuration:
                    config.connectionStateRecoveryDuration,
            };
        }

        this.io = new SocketIOServer(httpServer, options);
        this.io.use(socketLoggingMiddleware);
    }

    initialize() {
        logger.info("Initializing websocket server");
        registerWSEvents(this.io);
    }

    getIO(): SocketIOServer {
        return this.io;
    }
}
