import { FilterChange }           from "../../prisma/generated/client";
import { FilterChangeRepository } from "../repositories/interfaces/FilterChangeRepository";
import { ResourceNotFound }       from "../shared/exception/wrappers/ResourceNotFound";
import { WaterFountainService }   from "./WaterFountainService";

export class FilterChangeService {

    private repository:           FilterChangeRepository;
    private waterFountainService: WaterFountainService;

    constructor(repository: FilterChangeRepository, waterFountainService: WaterFountainService) {
        
        this.repository           = repository;
        this.waterFountainService = waterFountainService;

    }

    public async findLast(waterFountainId: string): Promise<FilterChange> {

        const waterFountainFound = await this.waterFountainService.findById(
            waterFountainId
        );

        if (!waterFountainFound) {
            throw new ResourceNotFound(
                `Water fountain with id ${waterFountainId} not found`
            );
        }

        const filterChange = await this.repository.findLast(waterFountainId);

        if (!filterChange) {
            throw new ResourceNotFound(
                `Has not filter change for water fountain with id ${waterFountainId} not found`
            );
        }

        return filterChange;

    }

}