import type { FastifyReply   }           from 'fastify';
import type { FastifyRequest }           from 'fastify';
import { TemperatureService }            from '../services/TemperatureService';
import { WaterFountainService }          from '../services/WaterFountainService';
import { WaterFountainPrismaRepository } from '../repositories/prisma/WaterFountainPrismaRepository';
import { TemperaturePrismaRepository } from '../repositories/prisma/TemperaturePrismaRepository';

export class TemperatureController {

    private temperatureService: TemperatureService;

    public constructor() {

        const waterFountainService = new WaterFountainService(
            new WaterFountainPrismaRepository()
        );

        this.temperatureService = new TemperatureService(
            new TemperaturePrismaRepository(),
            waterFountainService
        );

    }

    findLast = async (
        request: FastifyRequest<{ Params: {  waterFountainId: string } }>,
        reply:   FastifyReply
    ) => {

        const {waterFountainId} = request.params;

        const temperature = await this.temperatureService.findLast(waterFountainId);

        reply.status(200).send(temperature);

    }

}