import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../shared/exception/AppError";
import { ZodError } from "zod";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/client";
import Fastify from 'fastify';
import { errorCodes } from 'fastify'

export interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}

function buildErrorResponse(statusCode: number, error: string, message: string): ErrorResponse {
    return { statusCode, error, message };
}

export function ErrorHandlerMiddleware(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) {
    const app = reply.server as FastifyInstance;

    if (error instanceof AppError) {
        app.log.warn({ err: error }, `${error.name}: ${error.message}`);

        return reply    
            .status(error.statusCode)
            .send(buildErrorResponse(error.statusCode, error.name, error.message));
    }

    // Request validation errors (thrown by Zod)
    if (error instanceof ZodError) {
        const details = error.issues
            .map(v => v.message)
            .join("; ");

        app.log.warn({ err: error }, `Zod Validation Error: ${details}`);

        return reply
            .status(400)
            .send(buildErrorResponse(400, "Bad Request", details));
    }

    // Catch Fastify's errors
    if (error.code?.startsWith('FST_')) {
        const status = error.statusCode ?? 500;

        app.log.error({
            request: {
                method: request.method,
                url: request.url,
                headers: request.headers,
                body: request.body,
                query: request.query,
                parameters: request.params,
            },
            error: error,
        }, "A Fastify related error occurred");

        return reply
            .status(status)
            .send(buildErrorResponse(status, error.code, "An unknown error occurred."));
    }

    // For unexpected / unknown errors
    app.log.error({
        request: {
            method: request.method,
            url: request.url,
            headers: request.headers,
            body: request.body,
            query: request.query,
            parameters: request.params,
        },
        error: error,
    }, "An unhandled error occurred");

    reply
        .status(500)
        .send(buildErrorResponse(500, "Internal Server Error", "An unexpected error occurred."));
}
