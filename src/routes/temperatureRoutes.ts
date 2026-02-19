import { FastifyInstance }         from "fastify";
import { TemperatureController } from "../controllers/TemperatureController";

export async function temperatureRoutes(app: FastifyInstance) {

    const temperatureController = new TemperatureController();

    app.get<{ Params: { waterFountainId: string } }>(
        '/:waterFountainId/last', 
        {
            schema: {
                tags:        ['temperature'],
                summary:     "Retorna a última temperatura registrada",
                description: "Retorna a última temperatura registrada cadastrada no sistema",
                params: {
                    type:     'object',
                    required: ['waterFountainId'],
                    properties: {
                        waterFountainId: {
                            type:        'string',
                            format:      'uuid',
                            description: 'ID único do bebedouro',
                        },
                    }
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: {
                                type:    'string',
                                format:  'uuid',
                                example: '1954a69b-7683-4f1a-9963-b2fdc2df66e6',
                            },
                            temperature: {
                                type:    'number',
                                example: 70.80,
                            },
                            created_at: {
                                type:    'string',
                                format:  'date-time',
                                example: "2026-02-18T14:00:00.000Z"
                            },
                            updated_at: {
                                type:    'string',
                                format:  'date-time',
                                example: "2026-02-18T14:00:00.000Z"
                            }
                        }
                    }
                }
            },
        }, 
        temperatureController.findLast
    );


}