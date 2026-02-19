import { WaterFountain }           from "../../prisma/generated/client";
import { WaterFountainRepository } from "../repositories/interfaces/WaterFountainRepository";

export class WaterFountainService {

    private repository: WaterFountainRepository;

    constructor(repository: WaterFountainRepository) {
        
        this.repository = repository;

    }

    public async findById(waterFountainId: string) {
        return this.repository.findById(waterFountainId);
    }

    public async findAll(): Promise<WaterFountain[]> {
        return this.repository.findAll();
    }

}