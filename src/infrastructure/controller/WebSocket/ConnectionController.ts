import {Socket} from "socket.io";
import type {Controller} from "@infrastructure/shared/controller";

export class ConnectionController implements Controller<void> { // TODO
    constructor(private socket: Socket) {}

    async handle() {

    }


}