import { WaterFountain }           from "../../../prisma/generated/client";
import { WaterFountainRepository } from "../interfaces/WaterFountainRepository";

export class WaterFountainInMemoryRepository implements WaterFountainRepository {

    private waterFoutains: WaterFountain[];

    public constructor() {
        this.waterFoutains = [];
    }
    
    public async findById(waterFountainId: string): Promise<WaterFountain | null> {
        
        const waterFountain = this.waterFoutains.find(
            (wf) => wf.id === waterFountainId
        );

        return waterFountain ?? null;
    }

    public setMockData(waterFoutains: WaterFountain[]) {
        this.waterFoutains = waterFoutains;
    }

    public async findAll(): Promise<WaterFountain[]> {
        return this.waterFoutains;
    }

}