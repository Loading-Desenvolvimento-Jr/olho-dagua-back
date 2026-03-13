import { describe, it, expect, beforeEach } from "vitest";
import { TemperatureService }               from "../../src/services/TemperatureService"
import { TemperatureInMemoryRepository }    from "../../src/repositories/inMemory/TemperatureInMemoryRepository";
import { WaterFountainService }             from "../../src/services/WaterFountainService";
import { WaterFountainInMemoryRepository }  from "../../src/repositories/inMemory/WaterFountainInMemoryRepository";
import { WaterFountain, WaterTemperature }  from "../../prisma/generated/client";
import { ResourceNotFound }                 from "../../src/shared/exception/ResourceNotFound";

describe("WaterTemperatureService", () => {

    let temperatureInMemoryRepository:   TemperatureInMemoryRepository;
    let waterFountainInMemoryRepository: WaterFountainInMemoryRepository; 

    let temperatureService:   TemperatureService;
    let waterFountainService: WaterFountainService;

    beforeEach(() => {

        temperatureInMemoryRepository   = new TemperatureInMemoryRepository();
        waterFountainInMemoryRepository = new WaterFountainInMemoryRepository();

        waterFountainService = new WaterFountainService(
        waterFountainInMemoryRepository
        );
        temperatureService   = new TemperatureService(
        temperatureInMemoryRepository,
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

    it("should be possible to register a new temperature.", async () => {

        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);

        const temperature = await temperatureService.create(10, mockWaterFountain.id);

        expect(temperature.temperature).toBe(10);
        expect(temperature.waterFountainId).toBe(mockWaterFountain.id);

    });

    it("should throw ResourceNotFound if water fountain does not exist", async () => {

        await expect(
            temperatureService.create(10, "invalid-id")
        ).rejects.toThrow(ResourceNotFound);

    });

    it("should update the water fountain temperature", async () => {

        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);

        await temperatureService.create(25, mockWaterFountain.id);

        const waterFountainUpdated = await waterFountainService.findById(mockWaterFountain.id);

        expect(waterFountainUpdated?.temperature).toBe(25);

    });

    it("should store the temperature in the repository", async () => {

        waterFountainInMemoryRepository.setMockData([mockWaterFountain]);

        await temperatureService.create(18, mockWaterFountain.id);

        const temperatures = await temperatureInMemoryRepository.findAll();

        expect(temperatures.length).toBe(1);
        expect(temperatures[0].temperature).toBe(18);

    });


});
