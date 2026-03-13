import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../shared/exception/AppError";

export interface ErrorResponse {
    statusCode: number;
    error: string;      // short label like "Not Found", "Validation Error"
    message: string;    // human-readable detail
}


export function ErrorHandlerMiddleware(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) {
    const app = reply.server as FastifyInstance;

    if(error instanceof AppError) {
        return reply.status(error.statusCode).send({
            statusCode: error.statusCode,
            error: error.name,
            message: error.message,
        } as ErrorResponse);
    }
    
    // Logs all details of an unexpected error and the request that caused it
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
        },
    'An unhandled error occurred');

    reply.status(500).send({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An unexpected error occurred.",
        } as ErrorResponse);
}