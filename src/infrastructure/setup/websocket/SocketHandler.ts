import { Socket } from "socket.io";
import { ApplicationError } from "@domain/errors/ApplicationError";
import { UnauthorizedError } from "@infrastructure/errors/UnauthorizedError";
import { UnauthenticatedError } from "@infrastructure/errors/UnauthenticatedError";
import { DomainError } from "@domain/errors/DomainError";
import logger from "@infrastructure/helper/Logger";

export default function handleSocketEvent(
    handler: (socket: Socket) => Promise<void>
) {
    return async (socket: Socket) => {
        try {
            await handler(socket);
        } catch (e) {
            if (e instanceof ApplicationError) {
                handleError(socket, e);
            } else {
                socket.emit("errors", "An unknown error occurred");
                socket.disconnect(); // Unknown error, so disconnect for security reasons.
            }
        }
    };
}

function handleError(socket: Socket, e: ApplicationError) {
    if (e instanceof UnauthorizedError) {
        socket.emit("errors", "Unauthorized");
        disconnectSocket(socket);
    } else if (e instanceof UnauthenticatedError) {
        socket.emit("errors", "Unauthenticated");
        disconnectSocket(socket);
    } else if (e instanceof DomainError) {
        socket.emit("errors", e.message);
    } else {
        socket.emit("errors", "Something went wrong");
    }
}

function disconnectSocket(socket: Socket) {
    logger.info(`Disconnecting socket ${socket.id}`);
    socket.disconnect();
}
