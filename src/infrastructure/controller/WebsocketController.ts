import express, { NextFunction, Request, Response, Express } from "express";

export class WebsocketController {

    constructor(private socket: WebSocket, private request: Request) {}

    initialize() {
        console.log('WebSocket connection initialized');
        console.log(Object.getOwnPropertyNames(this.socket))
        console.log(typeof this.socket)
        // this.socket.on('message', (message: any) => this.handleMessage(message.toString()));
        // this.socket.on('close', () => this.handleClose());
        // this.socket.on('error', (error: any) => this.handleError(error));

        this.socket.send("Hello World")
    }

    private handleError(error: any) {
        console.log(error)
    }

    private handleClose() {

    }

    private async handleMessage(message: string) {
        console.log(message)

        try{
            const data = JSON.parse(message);
            this.socket.send(JSON.stringify({ data: "Hello World" }));

        }catch (e) {
            this.socket.send(JSON.stringify({ error: "Invalid request" }));

        }
    }
}