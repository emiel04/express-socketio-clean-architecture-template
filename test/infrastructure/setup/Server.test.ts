import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import express, { type Express } from "express";
import { registerRoutes } from "@infrastructure/setup/Routes";
import logger from "@infrastructure/helper/Logger";
import process from "node:process";
import Server from "@infrastructure/setup/Server";

vi.mock("express", () => {
    const mockApp = {
        use: vi.fn(),
        listen: vi.fn().mockReturnValue({
            close: vi.fn(),
        }),
    };

    return {
        __esModule: true,
        default: vi.fn(() => mockApp),
    };
});

vi.mock("@infrastructure/setup/Routes", () => ({
    registerRoutes: vi.fn(),
}));

vi.mock("morgan", () => {
    return {
        __esModule: true,
        default: vi.fn(() => (req: any, res: any, next: any) => next()),
    };
});

vi.mock("@infrastructure/setup/Middleware", () => ({
    errorMiddleware: vi.fn((req: any, res: any, next: any) => next()),
}));

vi.mock("@infrastructure/helper/Logger", () => ({
    default: {
        info: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("node:process", () => ({
    __esModule: true,
    default: {
        on: vi.fn(),
        exit: vi.fn(),
    },
}));

describe("Server", () => {
    let server: Server;
    let mockApp: Express;

    beforeEach(() => {
        vi.clearAllMocks();
        server = new Server();
        mockApp = express() as unknown as Express;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should register routes", () => {
        expect(registerRoutes).toHaveBeenCalledWith(mockApp);
        expect(registerRoutes).toHaveBeenCalledTimes(1);
    });

    it("should register middlewares", () => {
        expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
        expect(mockApp.use).toHaveBeenCalledTimes(3);
    });

    it("should handle process signals", () => {
        expect(process.on).toHaveBeenCalledWith("SIGINT", expect.any(Function));
        expect(process.on).toHaveBeenCalledWith(
            "SIGTERM",
            expect.any(Function)
        );
        expect(process.on).toHaveBeenCalledTimes(2);
    });

    it("should start the server on the specified port", () => {
        const port = 4000;
        server.start(port);
        const listenMock = mockApp.listen as Mock;
        expect(listenMock).toHaveBeenCalledWith({ port });
        expect(logger.info).toHaveBeenCalledWith(
            `Server is running at http://localhost:${port}`
        );
    });

    it("should start the server on the default port", () => {
        server.start();
        const listenMock = mockApp.listen as Mock;
        expect(listenMock).toHaveBeenCalledWith({ port: 3000 });
        expect(logger.info).toHaveBeenCalledWith(
            `Server is running at http://localhost:3000`
        );
    });

    it("should setup signal handlers correctly", () => {
        server = new Server();
        expect(process.on).toBeCalledWith("SIGINT", expect.any(Function));
        expect(process.on).toBeCalledWith("SIGTERM", expect.any(Function));

        const sigintHandler = (process.on as any).mock.calls.find(
            (call: any) => call[0] === "SIGINT"
        )[1];
        sigintHandler();
        expect(logger.info).toBeCalledWith(
            "Received signal. Shutting down gracefully..."
        );
        expect(process.exit).toBeCalledWith(0);

        vi.clearAllMocks();
        server = new Server();
        const sigtermHandler = (process.on as any).mock.calls.find(
            (call: any) => call[0] === "SIGTERM"
        )[1];
        sigtermHandler();
        expect(logger.info).toBeCalledWith(
            "Received signal. Shutting down gracefully..."
        );
        expect(process.exit).toBeCalledWith(0);
    });
});
