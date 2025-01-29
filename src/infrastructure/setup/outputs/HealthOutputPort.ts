import type { OutputPort } from "@application/shared/OutputPort";
import type { HealthOutput } from "@application/use-cases/HealthUseCase";
import express, {
    NextFunction,
    Request,
    type Response,
    Express,
} from "express";

export class HealthOutputPort implements OutputPort<HealthOutput> {
    private response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    present(output: HealthOutput): void {
        this.response.send(output);
    }
}
