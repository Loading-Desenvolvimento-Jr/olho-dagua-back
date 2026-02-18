import { WaterFountain } from "@prisma/client";

export interface WaterFountainRepository {

    findAll(): Promise<WaterFountain[]>;

}