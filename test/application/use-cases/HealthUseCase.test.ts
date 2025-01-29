// test/healthUseCase.test.ts

import { describe, test } from "@jest/globals";
import assert from "node:assert";
import {
    HealthOutput,
    HealthUseCase,
} from "@application/use-cases/HealthUseCase";
import { OutputPort } from "@application/shared/OutputPort";

describe("HealthUseCase", () => {
    let mockOutputPort: OutputPort<HealthOutput>;
    let outputData: HealthOutput;
    let healthUseCase: HealthUseCase;

    beforeEach(() => {
        mockOutputPort = {
            present(output: HealthOutput) {
                outputData = output;
            },
        };

        healthUseCase = new HealthUseCase(mockOutputPort);
    });

    test("should return status 'OK'", async () => {
        await healthUseCase.execute();
        assert.strictEqual(outputData!.status, "OK", "Status should be OK");
    });

    test("should return a date close to now", async () => {
        const now = new Date();
        await healthUseCase.execute();

        const tolerance = 200; // 200ms tolerance
        assert.ok(
            Math.abs(outputData!.date.getTime() - now.getTime()) < tolerance,
            "Date should be close to now",
        );
    });
});
