import {Controller} from "@infrastructure/shared/controller";
import {UseCase} from "@application/shared/UseCase";

export class HealthController implements Controller<void> {

    constructor(private useCase: UseCase<void>) {
    }
    async handle(): Promise<void> {
        await this.useCase.execute();
    }
}