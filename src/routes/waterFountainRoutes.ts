import { FastifyInstance }         from "fastify";
import { WaterFountainController } from "../controllers/WaterFountainController";

export async function waterFountainRoutes(app: FastifyInstance) {

    const waterFountainController = new WaterFountainController();

    app.get(
        '/', 
        {
            schema: {
                tags: ['water-fountain'],
                summary: "Retorna todos os bebedouros cadastrados",
                description: "Retorna uma lista com todos os bebedouros cadastrados no sistema",
                response: {
                    200: {
                        description: 'Lista de bebedouros retornada com sucesso',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type:    'string',
                                    format:  'uuid',
                                    example: '1954a69b-7683-4f1a-9963-b2fdc2df66e6',
                                },
                                name: {
                                    type:    'string',
                                    example: "Bebedouro Bloco A"
                                },
                                location: {
                                    type:    'string',
                                    example: "Bloco A - Térreo"
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
                }
            },
        }, 
        waterFountainController.findAll
    );


}