import { WaterFountain } from "../../../prisma/generated/client";

export interface WaterFountainRepository {

    update(waterFountain: WaterFountain): Promise<WaterFountain>;

    findAll(): Promise<WaterFountain[]>;
    findById(waterFountainId: string): Promise<WaterFountain | null>;

}