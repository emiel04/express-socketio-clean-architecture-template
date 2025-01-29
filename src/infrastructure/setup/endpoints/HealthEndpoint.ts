import type { Endpoint } from "@infrastructure/shared/endpoint";
import { HealthOutputPort } from "@infrastructure/setup/outputs/HealthOutputPort";
import { HealthUseCase } from "@application/use-cases/HealthUseCase";
import { HealthController } from "@infrastructure/controller/HealthController";
import express, { NextFunction, type Request, type Response, Express } from "express";

export class HealthEndpoint implements Endpoint {
    async handle(req: Request, res: Response): Promise<void> {
        const outputPort = new HealthOutputPort(res);
        const useCase = new HealthUseCase(outputPort);
        const controller = new HealthController(useCase);

        await controller.handle();

        return Promise.resolve();
    }
}
