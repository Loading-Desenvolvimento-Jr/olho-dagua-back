import { WaterTemperature }      from "../../prisma/generated/client";
import { TemperatureRepository } from "../repositories/interfaces/TemperatureRepository";
import { ResourceNotFound }      from "../shared/exception/ResourceNotFound";
import { WaterFountainService }  from "./WaterFountainService";

export class TemperatureService {

    private repository:           TemperatureRepository;
    private waterFountainService: WaterFountainService;

    constructor(repository: TemperatureRepository, waterFountainService: WaterFountainService) {
        
        this.repository           = repository;
        this.waterFountainService = waterFountainService;

    }

    public async findLast(waterFountainId: string): Promise<WaterTemperature> {

        const waterFountainFound = await this.waterFountainService.findById(
            waterFountainId
        );

        if (!waterFountainFound) {
            throw new ResourceNotFound(
                `Water fountain with id ${waterFountainId} not found`
            );
        }

        const temperature = await this.repository.findLast(waterFountainId);

        if (!temperature) {
            throw new ResourceNotFound(
                `Has not temperature for water fountain with id ${waterFountainId} not found`
            );
        }

        return temperature;

    }

}