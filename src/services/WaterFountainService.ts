import { WaterFountain }           from "@prisma/client";
import { WaterFountainRepository } from "../repositories/interfaces/WaterFountainRepository";

export class WaterFountainService {

    private repository: WaterFountainRepository;

    constructor(repository: WaterFountainRepository) {
        
        this.repository = repository;

    }

    public async findAll(): Promise<WaterFountain[]> {
        return this.repository.findAll();
    }

}