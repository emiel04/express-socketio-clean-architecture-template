import type { Socket } from "socket.io";
import type { Controller } from "@infrastructure/shared/Controller";

export class ConnectionController implements Controller<void> {
    // TODO
    constructor(private socket: Socket) {}

    async handle() {}
}
