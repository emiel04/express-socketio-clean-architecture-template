import {WSEndpoint} from "@infrastructure/shared/WSEndpoint";
import { Socket } from "socket.io";
import { Guid } from "guid-typescript";
import logger from "@infrastructure/setup/helper/Logger";
import {UnauthenticatedError} from "@domain/errors/UnauthenticatedError";
import {DomainError} from "@domain/errors/DomainError";


export class ConnectionEndpoint implements WSEndpoint {
    async handle(socket: Socket): Promise<void> {
        logger.info(
            `New websocket connection from ${socket.handshake.address} with id ${socket.id}`)

        const token = socket.handshake.query.token as string;

        if (token){
            this.handleAuth(socket, token);
            return;
        }
        // Anonymous session
        this.handleAnonymous(socket);




    }

    private handleAuth(socket: Socket, token: string) {
        // TODO authenication
        // TODO do something with connection (call controller?)
        throw new DomainError("Auth not implemented yet");
    }

    private handleAnonymous(socket: Socket) {
        const id = "anon." + Guid.create();

        // Now there is an anonymous things,
        socket.send(
            JSON.stringify({
                type: "anonymous",
                id: id
            }))
        throw new UnauthenticatedError();
        // for example, quit
        // TODO do something with connection (call controller?)

    }
}