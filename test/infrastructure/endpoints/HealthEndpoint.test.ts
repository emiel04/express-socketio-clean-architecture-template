import { HealthPresenter } from "@infrastructure/presenters/HealthPresenter";
import { HealthUseCase } from "@application/use-cases/HealthUseCase";
import { HealthController } from "@infrastructure/controller/Http/HealthController";
import type { Request, Response } from "express";
import { describe, it, expect, beforeEach, vi, Mocked } from "vitest";
import { HealthEndpoint } from "@infrastructure/endpoints/HealthEndpoint";

vi.mock("@infrastructure/presenters/HealthPresenter");
vi.mock("@application/use-cases/HealthUseCase");
vi.mock("@infrastructure/controller/Http/HealthController");

describe("HealthEndpoint", () => {
    let endpoint: HealthEndpoint;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockPresenter: Mocked<HealthPresenter>;
    let mockUseCase: Mocked<HealthUseCase>;
    let mockController: Mocked<HealthController>;

    beforeEach(() => {
        vi.clearAllMocks();

        mockRequest = {};
        mockResponse = {};
        mockPresenter = new HealthPresenter(
            mockResponse as Response
        ) as Mocked<HealthPresenter>;
        mockUseCase = new HealthUseCase(mockPresenter) as Mocked<HealthUseCase>;
        mockController = new HealthController(
            mockUseCase
        ) as Mocked<HealthController>;

        mockController.handle = vi.fn();

        endpoint = new HealthEndpoint();
    });

    it("should create instances of Presenter, UseCase, and Controller", async () => {
        await endpoint.handle(mockRequest as Request, mockResponse as Response);

        expect(HealthPresenter).toHaveBeenCalledWith(mockResponse);
        expect(HealthUseCase).toHaveBeenCalledWith(mockPresenter);
        expect(HealthController).toHaveBeenCalledWith(mockUseCase);
    });
});
