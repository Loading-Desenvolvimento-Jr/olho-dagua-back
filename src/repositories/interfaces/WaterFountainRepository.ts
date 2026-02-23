import { WaterFountain } from "../../../prisma/generated/client";

export interface WaterFountainRepository {

    findAll(): Promise<WaterFountain[]>;
    findById(waterFountainId: string): Promise<WaterFountain | null>;

}