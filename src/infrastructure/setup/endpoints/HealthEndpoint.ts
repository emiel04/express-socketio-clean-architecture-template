import type { Endpoint } from "@infrastructure/shared/endpoint";
import { HealthPresenter } from "@infrastructure/setup/outputs/HealthPresenter";
import { HealthUseCase } from "@application/use-cases/HealthUseCase";
import { HealthController } from "@infrastructure/controller/Http/HealthController";
import type { Request, Response } from "express";

export class HealthEndpoint implements Endpoint {
    async handle(req: Request, res: Response): Promise<void> {
        const presenter = new HealthPresenter(res);
        const useCase = new HealthUseCase(presenter);
        const controller = new HealthController(useCase);

        await controller.handle();

        return Promise.resolve();
    }
}
