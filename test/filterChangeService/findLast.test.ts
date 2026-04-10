import { describe, it, expect, beforeEach } from "vitest";
import { WaterFountainService }             from "../../src/services/WaterFountainService";
import { WaterFountainInMemoryRepository }  from "../../src/repositories/inMemory/WaterFountainInMemoryRepository";
import { FilterChange, WaterFountain }      from "../../prisma/generated/client";
import { FilterChangeInMemoryRepository }   from "../../src/repositories/inMemory/FilterChangeInMemoryRepository";
import { FilterChangeService }              from "../../src/services/FilterChangeService";
import { ResourceNotFound }                 from "../../src/shared/exception/exceptions-export";

describe("filterChangeService.findLast", () => {

    let waterFountainInMemoryRepository: WaterFountainInMemoryRepository; 
    let filterChangeInMemoryRepository:  FilterChangeInMemoryRepository; 

    let waterFountainService: WaterFountainService;
    let filterChangeService:  FilterChangeService;

    beforeEach(() => {

        waterFountainInMemoryRepository = new WaterFountainInMemoryRepository(); 
        filterChangeInMemoryRepository  = new FilterChangeInMemoryRepository(); 

        waterFountainService = new WaterFountainService(
            waterFountainInMemoryRepository
        );

        filterChangeService = new FilterChangeService(
            filterChangeInMemoryRepository,
            waterFountainService
        );

    });

    const mockWaterFountain = {
        id:        "t1",
        location:  "Bloco A",
        name:      "O melhor",
        createdAt: new Date(),
        updatedAt: new Date(),
    } as WaterFountain;

    const filterChange1 = {
        id: "c1",
        waterFountainId: mockWaterFountain.id,
        createdAt: new Date("2024-01-01"),
    } as FilterChange;

    const filterChange2 = {
        id: "c2",
        waterFountainId: mockWaterFountain.id,
        createdAt: new Date("2024-02-01"),
    } as FilterChange;

    it("should throw ResourceNotFound if water fountain does not exist", async () => {

        await expect(
            filterChangeService.findLast("invalid-id")
        ).rejects.toBeInstanceOf(ResourceNotFound);

    });

    it("should throw ResourceNotFound if water fountain exists but has no filter changes", async () => {

        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);

        await expect(
            filterChangeService.findLast(mockWaterFountain.id)
        ).rejects.toBeInstanceOf(ResourceNotFound);

    });

    it("should return the last filter change", async () => {

        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);
        filterChangeInMemoryRepository.setMockData([filterChange1, filterChange2])

        const result = await filterChangeService.findLast(mockWaterFountain.id);

        expect(result).toBeDefined();
        expect(result.id).toBe("c2");

    });

});