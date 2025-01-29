import {Socket} from "socket.io";

export interface WSEndpoint {
    handle(socket: Socket): Promise<void>;
}
