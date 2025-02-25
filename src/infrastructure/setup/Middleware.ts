import type { Socket } from "socket.io";
import type { NextFunction, Request, Response } from "express";
import { DomainError } from "@domain/errors/DomainError";
import { HttpError } from "@infrastructure/errors/HttpError";
import logger from "@infrastructure/helper/Logger";

function socketLoggingMiddleware(socket: Socket, next: (err?: any) => void) {
    socket.onAny((event, ...args) => {
        logger.info(
            `Socket event received: ${event}, Data: ${JSON.stringify(args)}, Id; ${socket.id}`
        );
    });
    next();
}

function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    logger.error(err);

    // Default to 500 if status is not set
    const statusCode = err.status || 500;

    if (err instanceof HttpError) {
        res.status(err.statusCode).json({
            error: err.message,
        });
        return;
    } else if (err instanceof DomainError) {
        res.status(400).json({
            error: err.message,
        });
        return;
    }

    res.status(statusCode).json({
        error: err.name || "InternalServerError",
        message: err.message || "Something went wrong.",
    });
}

export { socketLoggingMiddleware, errorMiddleware };
