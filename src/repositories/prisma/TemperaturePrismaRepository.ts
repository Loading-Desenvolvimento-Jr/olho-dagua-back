import { WaterTemperature }      from "../../../prisma/generated/client";
import { TemperatureRepository } from "../interfaces/TemperatureRepository";
import { prisma }                from "../../shared/prisma";

export class TemperaturePrismaRepository implements TemperatureRepository {

    public async findLast(waterFountainId: string): Promise<WaterTemperature | null> {
        return await prisma.waterTemperature.findFirst({
            where: {
                waterFountainId: waterFountainId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

}