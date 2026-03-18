import { WaterConsumption }      from "../../prisma/generated/client";
import { ConsumptionRepository } from "../repositories/interfaces/ConsumptionRepository";
import { ResourceNotFound }      from "../shared/exception/wrappers/ResourceNotFound";
import { FilterChangeService }   from "./FilterChangeService";
import { WaterFountainService }  from "./WaterFountainService";

function getFilterStatus(filteredLiters: number, maxCapacity = 4000) {

  const ratio = filteredLiters / maxCapacity;

  if (ratio <= 0.4) return "EXCELLENT";
  if (ratio <= 0.7) return "GOOD";
  if (ratio <= 0.9) return "ATTENTION";

  return "TO_REPLACE";

}

export class ConsumptionService {

    private repository:           ConsumptionRepository;
    private waterFountainService: WaterFountainService;
    private filterChangeService:  FilterChangeService;

    constructor(
        repository:           ConsumptionRepository, 
        waterFountainService: WaterFountainService, 
        filterChangeService:  FilterChangeService
    ) {
        
        this.repository           = repository;
        this.waterFountainService = waterFountainService;
        this.filterChangeService  = filterChangeService;

    }

    public async create(volume: number, waterFountainId: string): Promise<WaterConsumption> {

        const waterFountainFound = await this.waterFountainService.findById(
            waterFountainId
        );

        const consumptionRow = await this.repository.create(
            volume, 
            waterFountainId
        );

        const lastFilterChange = await this.filterChangeService.findLast(
            waterFountainId
        );

        const consumptionTotal = await this.repository.consumptionSince(
            lastFilterChange.createdAt,
            waterFountainId
        );

        waterFountainFound.filterStatus = getFilterStatus(consumptionTotal);

        await this.waterFountainService.update(waterFountainFound);

        return consumptionRow;

    }

}