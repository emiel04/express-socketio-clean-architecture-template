import type { UseCase } from "@application/shared/UseCase";
import type { OutputPort } from "@application/shared/OutputPort";

export interface HealthOutput {
    date: Date;
    status: string;
}

export class HealthUseCase implements UseCase<void> {
    private outputPort: OutputPort<HealthOutput>;

    constructor(outputPort: OutputPort<HealthOutput>) {
        this.outputPort = outputPort;
    }

    async execute(): Promise<void> {
        this.outputPort.present({ date: new Date(), status: "OK" });
        return Promise.resolve();
    }
}
