import { WaterConsumption }      from "../../../prisma/generated/client";
import { ConsumptionRepository } from "../interfaces/ConsumptionRepository";
import { randomUUID }            from "node:crypto";

export class ConsumptionInMemoryRepository implements ConsumptionRepository {

    private consumes: WaterConsumption[];

    public constructor() {
        this.consumes = [];
    }

    public setMockData(consumes: WaterConsumption[]) {
        this.consumes = consumes;
    }

    public async create(volume: number, waterFountainId: string): Promise<WaterConsumption> {
        
        const consumeRow: WaterConsumption = {
            id: randomUUID(),
            volume,
            waterFountainId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.consumes.push(consumeRow);

        return consumeRow;
        
    }

    public async consumptionSince(since: Date, waterFountainId: string): Promise<number> {
     
        let consumptionTotal = 0;
        
        for(const consumption of this.consumes) {

            if (consumption.createdAt >= since) {
                consumptionTotal += consumption.volume;
            }

        }

        return consumptionTotal;

    }

}