import { WaterTemperature }      from "../../../prisma/generated/client";
import { TemperatureRepository } from "../interfaces/TemperatureRepository";
import { randomUUID }            from "node:crypto";

export class TemperatureInMemoryRepository implements TemperatureRepository {

    private temperatures: WaterTemperature[];

    public constructor() {
        this.temperatures = [];
    }

    public setMockData(temperatures: WaterTemperature[]) {
        this.temperatures = temperatures;
    }

    public async findAll(): Promise<WaterTemperature[]> {
        return this.temperatures;
    }

    public async create(temperature: number, waterFountainId: string): Promise<WaterTemperature> {
        
        const temperatureRow: WaterTemperature = {
            id: randomUUID(),
            temperature,
            waterFountainId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.temperatures.push(temperatureRow);

        return temperatureRow;
        
    }

    public async findLast(waterFountainId: string): Promise<WaterTemperature | null> {
        
        let last: WaterTemperature | null = null;

        for (const temp of this.temperatures) {
            if (temp.waterFountainId === waterFountainId) {
                if (!last || temp.createdAt > last.createdAt) {
                    last = temp;
                }
            }
        }

        return last;
    }

}