import type { WSEndpoint } from "@infrastructure/shared/WSEndpoint";
import type { Socket } from "socket.io";
import { Guid } from "guid-typescript";
import logger from "@infrastructure/helper/Logger";
import { UnauthenticatedError } from "@infrastructure/errors/UnauthenticatedError";

export class ConnectionEndpoint implements WSEndpoint {
    async handle(socket: Socket): Promise<void> {
        logger.info(
            `New websocket connection from ${socket.handshake.address} with id ${socket.id}`
        );

        const token = socket.handshake.query.token as string;

        if (token) {
            this.handleAuth(socket, token);
            return;
        }
        // Anonymous session
        this.handleAnonymous(socket);
    }

    private handleAuth(socket: Socket, token: string) {
        // TODO authenication
        // TODO do something with connection (call controller?)
    }

    private handleAnonymous(socket: Socket) {
        const id = `anon.${Guid.create()}`;

        // Now there is an anonymous things,
        socket.send(
            JSON.stringify({
                type: "anonymous",
                id: id,
            })
        );
        throw new UnauthenticatedError();
        // for example, quit
        // TODO do something with connection (call controller?)
    }
}
