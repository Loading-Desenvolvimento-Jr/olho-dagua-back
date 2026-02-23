import { WaterFountain }           from "../../../prisma/generated/client";
import { WaterFountainRepository } from "../interfaces/WaterFountainRepository";
import { prisma }                  from "../../shared/prisma";

export class WaterFountainPrismaRepository implements WaterFountainRepository {

    public async findAll(): Promise<WaterFountain[]> {
        return await prisma.waterFountain.findMany();        
    }

    public async findById(waterFountainId: string): Promise<WaterFountain | null> {
        return await prisma.waterFountain.findUnique({
            where: {
                id: waterFountainId
            }
        });
    }

}