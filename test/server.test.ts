import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Server from "@infrastructure/setup/Server";
import config from "@helper/config";
import { startServer } from "../src/server";

const mockedServer = vi.mocked(Server);
const mockedConfig = vi.mocked(config);

vi.mock("@infrastructure/setup/Server", () => {
    return {
        default: vi.fn().mockImplementation(() => {
            return {
                start: vi.fn(),
            };
        }),
    };
});

vi.mock("@helper/config", () => ({
    default: {
        port: 3000,
    },
}));

vi.mock("@infrastructure/helper/Logger", () => ({
    default: {
        error: vi.fn(),
        info: vi.fn(),
    },
}));

describe("startServer", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should create a Server instance and call start with the configured port", () => {
        startServer();

        expect(mockedServer).toHaveBeenCalledTimes(1);

        const serverStartMock = mockedServer.mock.results[0].value.start;

        expect(serverStartMock).toHaveBeenCalledWith(mockedConfig.port);
        expect(serverStartMock).toHaveBeenCalledTimes(1);
    });
});
