import { registerRoutes } from "@infrastructure/setup/Routes";
import morgan from "morgan";
import type { Server as HttpServer } from "node:http";
import cors from "cors";
import express, {
    type NextFunction,
    type Request,
    type Response,
    type Express,
} from "express";
import logger from "@infrastructure/setup/helper/Logger";
import { WebSocketServer } from "@infrastructure/setup/websocket/WebsocketServer";
class Server {
    private readonly app: Express;
    private webSocketServer?: WebSocketServer;
    private httpServer?: HttpServer;

    constructor() {
        this.app = express();
        this.app.use(cors());

        this.app.use(
            morgan("common", {
                stream: { write: (msg: any) => logger.info(msg.trim()) },
            })
        );

        this.registerRoutes();
        this.registerErrorHandler();
        this.handleProcessSignals();
    }

    private registerRoutes() {
        registerRoutes(this.app);
    }

    private registerErrorHandler() {
        this.app.use(
            (err: any, req: Request, res: Response, next: NextFunction) => {
                console.error(err); // Log error
                const statusCode = err.status || 500; // Default to 500 if status is not set
                res.status(statusCode).json({
                    error: err.name || "InternalServerError",
                    message: err.message || "Something went wrong.",
                });
            }
        );
    }

    private handleProcessSignals() {
        const signalHandler = async (): Promise<void> => {
            logger.info("Received signal. Shutting down gracefully...");
            process.exit(0);
        };

        process.on("SIGINT", signalHandler); // Handle Ctrl+C
        process.on("SIGTERM", signalHandler); // Handle termination signal
    }

    public start(port = 3000) {
        this.httpServer = this.app.listen({ port });
        this.webSocketServer = new WebSocketServer(this.httpServer);
        this.webSocketServer.initialize();
        logger.info(`Server is running at http://localhost:${port}`);
    }
}

export default Server;
