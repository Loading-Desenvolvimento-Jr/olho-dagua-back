import { WaterConsumption } from "../../../prisma/generated/client";

export interface ConsumptionRepository {

    create(volume: number, waterFountainId: string): Promise<WaterConsumption>;

    consumptionSince(since: Date, waterFountainId: string): Promise<number>;

}