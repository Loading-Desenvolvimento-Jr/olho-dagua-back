import { WaterTemperature }      from "../../prisma/generated/client";
import { TemperatureRepository } from "../repositories/interfaces/TemperatureRepository";
import { ResourceNotFound }      from "../shared/exception/wrappers/ResourceNotFound";
import { WaterFountainService }  from "./WaterFountainService";

export class TemperatureService {

    private repository:           TemperatureRepository;
    private waterFountainService: WaterFountainService;

    constructor(repository: TemperatureRepository, waterFountainService: WaterFountainService) {
        
        this.repository           = repository;
        this.waterFountainService = waterFountainService;

    }

    public async create(temperature: number, waterFountainId: string): Promise<WaterTemperature> {

        const waterFountainFound = await this.waterFountainService.findById(
            waterFountainId
        );

        waterFountainFound.temperature = temperature;

        this.waterFountainService.update(waterFountainFound);

        const temperatureRow = await this.repository.create(
            temperature, 
            waterFountainId
        );

        return temperatureRow;

    }

    public async findLast(waterFountainId: string): Promise<WaterTemperature> {

        const waterFountainFound = await this.waterFountainService.findById(
            waterFountainId
        );

        const temperature = await this.repository.findLast(waterFountainId);

        if (!temperature) {
            throw new ResourceNotFound(
                `No temperature readings found for water fountain with id ${waterFountainId}`
            );
        }

        return temperature;

    }

}