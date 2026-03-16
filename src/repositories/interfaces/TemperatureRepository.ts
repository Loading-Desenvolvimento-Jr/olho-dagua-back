import { WaterTemperature } from "../../../prisma/generated/client";

export interface TemperatureRepository {

    create(temperature: number, waterFountainId: string): Promise<WaterTemperature>;

    findLast(waterFountainId: string): Promise<WaterTemperature | null>;
    findAll(): Promise<WaterTemperature[]>;

}