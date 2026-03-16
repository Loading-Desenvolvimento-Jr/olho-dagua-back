import { describe, it, expect, beforeEach } from "vitest";
import { WaterFountainService }             from "../../src/services/WaterFountainService";
import { WaterFountainInMemoryRepository }  from "../../src/repositories/inMemory/WaterFountainInMemoryRepository";
import { WaterFountain }                    from "../../prisma/generated/client";

describe("WaterFountainService", () => {

    let repositoryMock: WaterFountainInMemoryRepository;
    let service:        WaterFountainService;

    const mockData: WaterFountain[] = [
        {
            id:       "1",
            name:     "Mucambinho",
            location: "Mucambo",
            filterStatus: 'GOOD',
            temperature: 70.0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    beforeEach(() => {
        repositoryMock  = new WaterFountainInMemoryRepository()
        service         = new WaterFountainService(repositoryMock);
    });

    it("should update an existing water fountain", async () => {

        repositoryMock.setMockData(mockData);

        const updatedWaterFountain: WaterFountain = {
            ...mockData[0],
            name: "Novo Nome",
            temperature: 20
        };

        const result = await service.update(updatedWaterFountain);

        expect(result.name).toBe("Novo Nome");
        expect(result.temperature).toBe(20);

    });

    it("should persist the update in the repository", async () => {

        repositoryMock.setMockData(mockData);

        const updatedWaterFountain: WaterFountain = {
            ...mockData[0],
            location: "Bloco B"
        };

        await service.update(updatedWaterFountain);

        const waterFountain = await service.findById(mockData[0].id);

        expect(waterFountain?.location).toBe("Bloco B");

    });

});
