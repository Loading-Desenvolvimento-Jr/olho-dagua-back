import { WaterFountain }           from "../../prisma/generated/client";
import { WaterFountainRepository } from "../repositories/interfaces/WaterFountainRepository";
import { ResourceNotFound } from "../shared/exception/ResourceNotFound";

export class WaterFountainService {

    private repository: WaterFountainRepository;

    constructor(repository: WaterFountainRepository) {
        
        this.repository = repository;

    }

    public async findById(waterFountainId: string) {
        return await this.repository.findById(waterFountainId);
    }

    public async findAll(): Promise<WaterFountain[]> {
        return await this.repository.findAll();
    }

    public async update(waterFountain: WaterFountain): Promise<WaterFountain> {

        const waterFountainFound = await this.findById(
            waterFountain.id
        );

        if (!waterFountainFound) {
            throw new ResourceNotFound(
                `Water fountain with id ${waterFountain.id} not found`
            );
        }

        return await this.repository.update(waterFountain);
    }

}