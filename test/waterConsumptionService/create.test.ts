import { describe, it, expect, beforeEach } from "vitest";
import { WaterFountainService }             from "../../src/services/WaterFountainService";
import { WaterFountainInMemoryRepository }  from "../../src/repositories/inMemory/WaterFountainInMemoryRepository";
import { FilterChange, WaterFountain }      from "../../prisma/generated/client";
import { ConsumptionService }               from "../../src/services/ConsumptionService";
import { ConsumptionInMemoryRepository }    from "../../src/repositories/inMemory/ConsumptionInMemoryRepository";
import { FilterChangeInMemoryRepository }   from "../../src/repositories/inMemory/FilterChangeInMemoryRepository";
import { FilterChangeService }              from "../../src/services/FilterChangeService";
import { ResourceNotFound }                 from "../../src/shared/exception/exceptions-export";

describe("WaterConsumptionService.create", () => {

    let consumptionInMemoryRepository:   ConsumptionInMemoryRepository;
    let waterFountainInMemoryRepository: WaterFountainInMemoryRepository; 
    let filterChangeInMemoryRepository:  FilterChangeInMemoryRepository; 

    let consumptionService:   ConsumptionService;
    let waterFountainService: WaterFountainService;
    let filterChangeService:  FilterChangeService;

    beforeEach(() => {

        waterFountainInMemoryRepository = new WaterFountainInMemoryRepository(); 
        filterChangeInMemoryRepository  = new FilterChangeInMemoryRepository(); 
        consumptionInMemoryRepository   = new ConsumptionInMemoryRepository();

        waterFountainService = new WaterFountainService(
            waterFountainInMemoryRepository
        );
        filterChangeService = new FilterChangeService(
            filterChangeInMemoryRepository,
            waterFountainService
        );
        consumptionService   = new ConsumptionService(
            consumptionInMemoryRepository,
            waterFountainService,
            filterChangeService
        );

    });

    const mockWaterFountain = {
        id:        "t1",
        location:  "Bloco A",
        name:      "O melhor",
        createdAt: new Date(),
        updatedAt: new Date(),
    } as WaterFountain;

    const mockFilterChange = {
        id:              "f1",
        createdAt:       new Date("2026-03-17T17:51:45.907Z"),
        updatedAt:       new Date("2026-03-17T17:51:45.907Z"),
        waterFountainId: mockWaterFountain.id
    } as FilterChange;


    it("should create a water consumption", async () => {

        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);
        filterChangeInMemoryRepository.setMockData([mockFilterChange]);

        const consumption = await consumptionService.create(
            10,
            mockWaterFountain.id
        );

        expect(consumption).toBeDefined();
        expect(consumption.volume).toBe(10);
        expect(consumption.waterFountainId).toBe(mockWaterFountain.id);

    });


    it("should throw ResourceNotFound if water fountain does not exist", async () => {

        await expect(() =>
            consumptionService.create(10, "invalid-id")
        ).rejects.toBeInstanceOf(ResourceNotFound);

    });


    it("should update filter status to GOOD when consumption reaches 50%", async () => {
        
        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);
        filterChangeInMemoryRepository.setMockData([mockFilterChange]);

        await consumptionService.create(2000, mockWaterFountain.id);

        const fountain = await waterFountainService.findById(mockWaterFountain.id);
        
        expect(fountain?.filterStatus).toBe("GOOD");

    });


    it("should update filter status to ATTENTION when consumption reaches 80%", async () => {

        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);
        filterChangeInMemoryRepository.setMockData([mockFilterChange]);

        await consumptionService.create(3200, mockWaterFountain.id);

        const fountain = await waterFountainService.findById(mockWaterFountain.id);

        expect(fountain?.filterStatus).toBe("ATTENTION");

    });


    it("should update filter status to TO_REPLACE when consumption reaches 95%", async () => {

        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);
        filterChangeInMemoryRepository.setMockData([mockFilterChange]);

        await consumptionService.create(3800, mockWaterFountain.id);

        const fountain = await waterFountainService.findById(mockWaterFountain.id);

        expect(fountain?.filterStatus).toBe("TO_REPLACE");

    });

});
