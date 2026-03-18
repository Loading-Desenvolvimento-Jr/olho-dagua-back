import { ConsumptionRepository } from "../interfaces/ConsumptionRepository";
import { WaterConsumption }      from "../../../prisma/generated/client";
import { prisma }                from "../../shared/prisma";

export class ConsumptionPrismaRepository implements ConsumptionRepository {

    public async create(volume: number, waterFountainId: string): Promise<WaterConsumption> {
        return await prisma.waterConsumption.create({
            data: {
                volume,
                waterFountainId
            }
        });
    }

    public async consumptionSince(since: Date, waterFountainId: string): Promise<number> {

        const aggregations = await prisma.waterConsumption.aggregate({
            _sum: { volume: true },
            where: {
                waterFountainId,
                createdAt: {
                    gte: since
                }
            }
        });

        return aggregations._sum.volume ?? 0;

    }

}