import type {Socket} from "socket.io";
import logger from "@infrastructure/setup/helper/Logger";

function loggingMiddleware(socket: Socket, next: (err?: any) => void) {
    socket.onAny((event, ...args) => {
        logger.info(`Socket event received: ${event}, Data: ${JSON.stringify(args)}, Id; ${socket.id}`);
    });
    next();
}

export default loggingMiddleware;