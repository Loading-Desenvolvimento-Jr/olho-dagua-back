import { describe, it, expect, beforeEach } from "vitest";
import { TemperatureService }               from "../../src/services/TemperatureService"
import { TemperatureInMemoryRepository }    from "../../src/repositories/inMemory/TemperatureInMemoryRepository";
import { WaterFountainService }             from "../../src/services/WaterFountainService";
import { WaterFountainInMemoryRepository }  from "../../src/repositories/inMemory/WaterFountainInMemoryRepository";
import { WaterFountain, WaterTemperature }  from "../../prisma/generated/client";
import { ResourceNotFound }                 from "../../src/shared/exception/wrappers/ResourceNotFound";

describe("WaterTemperatureService.findLast", () => {

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

  const mockTemperature = {
    id:              "t1",
    waterFountainId: mockWaterFountain.id,
    temperature:     23,
    createdAt:       new Date(),
    updatedAt:       new Date(),
  } as WaterTemperature;

  it("should return the last temperature", async () => {

    waterFountainInMemoryRepository.setMockData([mockWaterFountain]);
    temperatureInMemoryRepository.setMockData([mockTemperature]);

    const lastTemperature = await temperatureService.findLast(
      mockWaterFountain.id
    );

    expect(lastTemperature).toEqual(mockTemperature);
  });

  it("should throw ResourceNotFound when water fountain does not exist", async () => {

    await expect(temperatureService.findLast(""))
      .rejects
      .toThrow(ResourceNotFound);

  });

  it("should throw ResourceNotFound when temperature does not exist", async () => {

    waterFountainInMemoryRepository.setMockData([mockWaterFountain]);

    await expect(temperatureService.findLast("wf1"))
      .rejects
      .toBeInstanceOf(ResourceNotFound);
  });

});
