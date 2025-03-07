import { describe, beforeEach, it, expect, vi } from "vitest";
import { errorMiddleware } from "@infrastructure/setup/Middleware";
import { Request, Response } from "express";
import logger from "@infrastructure/helper/Logger";
import { DomainError } from "@domain/errors/DomainError";
import { HttpError } from "@infrastructure/errors/HttpError";

vi.mock("@infrastructure/helper/Logger", () => ({
    default: {
        error: vi.fn(),
        info: vi.fn(),
    },
}));

describe("errorMiddleware", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockNext: any;

    beforeEach(() => {
        vi.clearAllMocks();

        mockRequest = {};
        mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as any;

        mockNext = vi.fn();
    });

    it("should handle generic Error", () => {
        const error = new Error("Internal server error");

        errorMiddleware(
            error,
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Error",
            message: "Internal server error",
        });
        expect(logger.error).toHaveBeenCalledWith(error);
    });

    it("should handle errors with custom status code", () => {
        const error = new Error("Payment required");
        (error as any).status = 402;

        errorMiddleware(
            error,
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(402);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Error",
            message: "Payment required",
        });
        expect(logger.error).toHaveBeenCalledWith(error);
    });

    it("should handle DomainError", () => {
        const error = new DomainError("Validation failed");

        errorMiddleware(
            error,
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Validation failed",
        });
        expect(logger.error).toHaveBeenCalledWith(error);
    });

    it("should handle HttpError)", () => {
        const error = new HttpError("Resource not found", 404);

        errorMiddleware(
            error,
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Resource not found",
        });
        expect(logger.error).toHaveBeenCalledWith(error);
    });
});
