import { describe, it, expect, beforeEach } from "vitest";
import { WaterFountainService }             from "../src/services/WaterFountainService";
import { WaterFountainInMemoryRepository }  from "../src/repositories/inMemory/WaterFountainInMemoryRepository";
import { WaterFountain }                    from "../prisma/generated/client";

describe("WaterFountainService", () => {

    let repositoryMock: WaterFountainInMemoryRepository;
    let service:        WaterFountainService;

    const mockData: WaterFountain[] = [
        {
            id:       "1",
            name:     "Mucambinho",
            location: "Mucambo",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    beforeEach(() => {
        repositoryMock  = new WaterFountainInMemoryRepository()
        service         = new WaterFountainService(repositoryMock);
    });

    it("should run smoothly", async () => {

        expect(service.findAll()).resolves

    });

    it("should return an empty array if there is nothing to return", async () => {

        const waterFountains = await service.findAll();

        expect(waterFountains).toStrictEqual([]);
        expect(waterFountains).toHaveLength(0);

    });

    it("should return an array if there is data.", async () => {

        repositoryMock.setMockData(mockData)

        const waterFountains = await service.findAll();

        expect(waterFountains).toStrictEqual(mockData);
        expect(waterFountains).toHaveLength(1);

    });

});
