import { WaterFountain }           from "@prisma/client";
import { WaterFountainRepository } from "../interfaces/WaterFountainRepository";
import { prisma }                  from "../../shared/prisma";

export class WaterFountainPrismaRepository implements WaterFountainRepository {

    public async findAll(): Promise<WaterFountain[]> {
        return await prisma.waterFountain.findMany();        
    }

}