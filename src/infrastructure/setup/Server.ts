import { registerRoutes } from "@infrastructure/setup/Routes";
import morgan from "morgan";
import type { Server as HttpServer } from "node:http";
import cors from "cors";
import process from "node:process";
import express, { type Express } from "express";
import logger from "@infrastructure/helper/Logger";
import { errorMiddleware } from "@infrastructure/setup/Middleware";
class Server {
    private readonly app: Express;
    private httpServer?: HttpServer;

    constructor() {
        this.app = express();
        this.app.use(cors());

        this.registerRoutes();
        this.registerMiddlewares();
        this.handleProcessSignals();
    }

    private registerRoutes() {
        registerRoutes(this.app);
    }

    private registerMiddlewares() {
        this.app.use(
            morgan("common", {
                stream: { write: (msg: any) => logger.info(msg.trim()) },
            })
        );
        this.app.use(errorMiddleware);
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
        logger.info(`Server is running at http://localhost:${port}`);
    }
}

export default Server;
