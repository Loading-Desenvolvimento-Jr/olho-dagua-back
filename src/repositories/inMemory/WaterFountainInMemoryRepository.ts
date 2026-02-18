import { WaterFountain }           from "@prisma/client";
import { WaterFountainRepository } from "../interfaces/WaterFountainRepository";

export class WaterFountainInMemoryRepository implements WaterFountainRepository {

    private waterFoutains: WaterFountain[];

    public constructor() {
        this.waterFoutains = [];
    }

    public setMockData(waterFoutains: WaterFountain[]) {
        this.waterFoutains = waterFoutains;
    }

    public async findAll(): Promise<WaterFountain[]> {
        return this.waterFoutains;
    }

}