import { WaterTemperature } from "../../../prisma/generated/client";

export interface TemperatureRepository {

    findLast(waterFountainId: string): Promise<WaterTemperature | null>;

}