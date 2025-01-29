import {registerRoutes} from "@infrastructure/setup/Routes";
import { Server as SocketIOServer } from "socket.io";
import winston from 'winston';
import morgan from 'morgan';
import DailyRotateFile from 'winston-daily-rotate-file';

import cors from 'cors'
import express, { NextFunction, Request, Response, Express } from "express";
class Server {
    private readonly app: Express;
    private readonly io: SocketIOServer;

    constructor() {

        this.app = express();
        this.app.use(cors());
        const logger = createLogger();
        this.app.use(morgan('common', { stream: { write: (msg: any) => logger.info(msg.trim()) } }));

        this.io = new SocketIOServer();

        this.registerRoutes();
        this.registerErrorHandler();
        this.handleProcessSignals();
    }

    private registerRoutes() {
        registerRoutes(this.app, this.io)
    }

    private registerErrorHandler() {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err); // Log error
            const statusCode = err.status || 500; // Default to 500 if status is not set
            res.status(statusCode).json({
                error: err.name || 'InternalServerError',
                message: err.message || 'Something went wrong.',
            });
        });
    }

    private handleProcessSignals() {
        const signalHandler = async (): Promise<void> => {
            console.log(`Received signal. Shutting down gracefully...`);
            await this.close();
            process.exit(0);
        };

        process.on("SIGINT", signalHandler); // Handle Ctrl+C
        process.on("SIGTERM", signalHandler); // Handle termination signal

    }

    public async start(port: number = 3000) {
        try {
            this.app.listen({ port });
            console.log(`Server is running at http://localhost:${port}`);
        } catch (err) {
            process.exit(1);
        }
    }

    public async close() {
        try {
            // await this.app.close();
            console.log('Server closed.');
        } catch (err) {
            console.error('Error during server close:', err);
        }
    }
}


function createLogger() {
    const logger = winston.createLogger({
        level: 'info',
        transports: [
            // Console transport with colorized output for terminal
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),          // Enable colorized logging for console
                    winston.format.timestamp(),         // Add timestamp to logs
                    winston.format.simple()
                )
            }),
            // DailyRotateFile transport for log files without colors
            new DailyRotateFile({
                filename: 'logs/app-%DATE%.log',    // Use %DATE% to create daily rotated logs
                datePattern: 'YYYY-MM-DD',          // Set the pattern for rotating daily
                maxSize: '5m',                      // Limit the file size to 5MB
                maxFiles: '14d',                    // Keep logs for 14 days
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),     // Add timestamp to the file logs
                    winston.format.json()            // Plain JSON format for log file
                ),
            }),
        ],
    });
    return logger;
}

export default Server;