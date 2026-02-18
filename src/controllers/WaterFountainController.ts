import type { FastifyReply   }           from 'fastify';
import type { FastifyRequest }           from 'fastify';
import { WaterFountainService }          from '../services/WaterFountainService';
import { WaterFountainPrismaRepository } from '../repositories/prisma/WaterFountainPrismaRepository';

export class WaterFountainController {

    private waterFountainService: WaterFountainService;

    public constructor() {

        this.waterFountainService = new WaterFountainService(
            new WaterFountainPrismaRepository
        );

    }

    findAll = async (request: FastifyRequest, reply: FastifyReply) => {
        
        const waterFountains = await this.waterFountainService.findAll();

        reply.status(200).send(waterFountains);

    }

}