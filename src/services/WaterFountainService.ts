import { WaterFountain }           from "../../prisma/generated/client";
import { WaterFountainRepository } from "../repositories/interfaces/WaterFountainRepository";
import { ResourceNotFound }        from "../shared/exception/wrappers/ResourceNotFound";

export class WaterFountainService {

    private repository: WaterFountainRepository;

    constructor(repository: WaterFountainRepository) {
        
        this.repository = repository;

    }

    public async findById(waterFountainId: string) {
        const waterFountainFound = await this.repository.findById(waterFountainId);

        if (!waterFountainFound) {
            throw new ResourceNotFound(
                `Water fountain with id ${waterFountainId} not found`
            );
        }

        return waterFountainFound;
    }

    public async findAll(): Promise<WaterFountain[]> {
        return await this.repository.findAll();
    }

    public async update(waterFountain: WaterFountain): Promise<WaterFountain> {

        const waterFountainFound = await this.findById(
            waterFountain.id
        );

        return await this.repository.update(waterFountain);
    }

}