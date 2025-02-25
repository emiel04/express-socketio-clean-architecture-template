import type { Controller } from "@infrastructure/shared/Controller";
import type { UseCase } from "@application/shared/UseCase";

export class HealthController implements Controller<void> {
    constructor(private useCase: UseCase<void>) {}
    async handle(): Promise<void> {
        await this.useCase.execute();
    }
}
