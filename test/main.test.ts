import { describe, it, vi, expect, afterEach } from "vitest";
import * as serverModule from "../src/server"; // Import as a module

vi.mock("../src/server", () => ({
    startServer: vi.fn(),
}));

describe("main entry point", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
    });

    it("should call startServer when the module is imported", async () => {
        expect(serverModule.startServer).toHaveBeenCalledTimes(0);

        await import("../src/main");

        expect(serverModule.startServer).toHaveBeenCalledTimes(1);
    });
});
