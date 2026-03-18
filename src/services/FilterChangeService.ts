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

        const filterChange = await this.repository.findLast(waterFountainId);

        if (!filterChange) {
            throw new ResourceNotFound(
                `No filter changes found for water fountain with id ${waterFountainId}`
            );
        }

        return filterChange;

    }

}